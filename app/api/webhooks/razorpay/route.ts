import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

// Razorpay plan ID to our Plan enum mapping
const PLAN_MAPPING: Record<string, "STARTER" | "BUSINESS" | "ENTERPRISE"> = {
    "plan_S2aq4J6a1w3WyM": "STARTER",    // Standard -> STARTER
    "plan_S2aqbdhoFQ1fJT": "BUSINESS",   // Premium -> BUSINESS
    "plan_S2arHiumMnpSilc": "ENTERPRISE", // Elite -> ENTERPRISE
}

// Verify Razorpay webhook signature
function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex")
    return expectedSignature === signature
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get("x-razorpay-signature")

        if (!signature) {
            console.error("[Razorpay Webhook] Missing signature")
            return NextResponse.json({ error: "Missing signature" }, { status: 400 })
        }

        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
        if (!webhookSecret) {
            console.error("[Razorpay Webhook] Missing webhook secret")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        // Verify signature
        if (!verifyWebhookSignature(body, signature, webhookSecret)) {
            console.error("[Razorpay Webhook] Invalid signature")
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
        }

        const event = JSON.parse(body)
        console.log("[Razorpay Webhook] Event received:", event.event)

        // Handle subscription events
        if (event.event === "subscription.activated" || event.event === "subscription.charged") {
            const subscription = event.payload.subscription.entity
            const planId = subscription.plan_id
            const razorpaySubId = subscription.id
            const customerId = subscription.customer_id
            const customerEmail = event.payload.subscription.entity.notes?.email ||
                event.payload.subscription.entity.customer_details?.email

            console.log("[Razorpay Webhook] Subscription:", {
                planId,
                razorpaySubId,
                customerId,
                customerEmail,
            })

            // Get the plan from mapping
            const plan = PLAN_MAPPING[planId]
            if (!plan) {
                console.error("[Razorpay Webhook] Unknown plan ID:", planId)
                return NextResponse.json({ error: "Unknown plan" }, { status: 400 })
            }

            // Find restaurant by email (from notes or customer details)
            if (customerEmail) {
                const restaurant = await prisma.restaurant.findUnique({
                    where: { email: customerEmail },
                    include: { subscription: true },
                })

                if (restaurant) {
                    // Update or create subscription
                    if (restaurant.subscription) {
                        await prisma.subscription.update({
                            where: { restaurantId: restaurant.id },
                            data: {
                                plan,
                                status: "ACTIVE",
                                razorpaySubId,
                                razorpayPlanId: planId,
                                razorpayCustomerId: customerId,
                                expiresAt: subscription.current_end
                                    ? new Date(subscription.current_end * 1000)
                                    : null,
                            },
                        })
                    } else {
                        await prisma.subscription.create({
                            data: {
                                restaurantId: restaurant.id,
                                plan,
                                status: "ACTIVE",
                                razorpaySubId,
                                razorpayPlanId: planId,
                                razorpayCustomerId: customerId,
                                expiresAt: subscription.current_end
                                    ? new Date(subscription.current_end * 1000)
                                    : null,
                            },
                        })
                    }

                    console.log("[Razorpay Webhook] Updated subscription for:", restaurant.email, "Plan:", plan)
                } else {
                    console.warn("[Razorpay Webhook] Restaurant not found for email:", customerEmail)
                }
            } else {
                console.warn("[Razorpay Webhook] No customer email in subscription")
            }
        }

        // Handle subscription cancelled
        if (event.event === "subscription.cancelled") {
            const subscription = event.payload.subscription.entity
            const razorpaySubId = subscription.id

            await prisma.subscription.updateMany({
                where: { razorpaySubId },
                data: { status: "CANCELLED" },
            })

            console.log("[Razorpay Webhook] Cancelled subscription:", razorpaySubId)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error("[Razorpay Webhook] Error:", error)
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
    }
}
