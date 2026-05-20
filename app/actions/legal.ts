"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const defaultPrivacyPolicy = `
# Privacy Policy

**Effective Date:** ${new Date().toLocaleDateString('en-IN')}

## 1. Introduction
Welcome to Aerobill. We respect your privacy and are committed to protecting your personal data.

## 2. Data We Collect
We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.

## 3. How We Use Your Data
We use your data to provide, maintain, and improve our services.

## 4. Contact Us
If you have any questions about this Privacy Policy, please contact us at support@aerobill.in.
`

const defaultTermsConditions = `
# Terms and Conditions

**Effective Date:** ${new Date().toLocaleDateString('en-IN')}

Welcome to Aerobill! These terms and conditions outline the rules and regulations for the use of Aerobill's Website and Restaurant Management Software, located at https://www.aerobill.in.

Aerobill is operated by **ASSETMAGNETS**, located at 7th Floor, DLF Cybercity, Bhubaneswar, Odisha, 751024.

By accessing this website, we assume you accept these terms and conditions. Do not continue to use Aerobill if you do not agree to take all of the terms and conditions stated on this page.

## 1. Terminology
- **"Client", "You" and "Your"** refers to you, the person log on this website and compliant to the Company’s terms and conditions.
- **"The Company", "Ourselves", "We", "Our" and "Us"** refers to our Company, ASSETMAGNETS.
- **"Party", "Parties", or "Us"** refers to both the Client and ourselves.

## 2. License
Unless otherwise stated, ASSETMAGNETS and/or its licensors own the intellectual property rights for all material on Aerobill. All intellectual property rights are reserved. You may access this from Aerobill for your own personal and business use subjected to restrictions set in these terms and conditions.

## 3. User Restrictions
You must not:
- Republish material from Aerobill
- Sell, rent or sub-license material from Aerobill
- Reproduce, duplicate or copy material from Aerobill
- Redistribute content from Aerobill

## 4. User Accounts and Subscriptions
To use Aerobill's premium restaurant management features, you must register for an account and subscribe to a billing plan. Subscriptions are billed through secure payment gateways (including Razorpay). You agree to provide accurate billing and contact information.

## 5. Liability
We shall not be held responsible for any data loss, service interruptions, or business losses resulting from the use of Aerobill. Our software is provided on an "as is" and "as available" basis.

## 6. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Odisha, India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.

## 7. Contact Us
If you have any questions about our Terms and Conditions, please contact us at support@aerobill.in.
`

const defaultShippingPolicy = `
# Shipping and Delivery Policy

**Effective Date:** ${new Date().toLocaleDateString('en-IN')}

Aerobill is a Software-as-a-Service (SaaS) platform operated by **ASSETMAGNETS**.

## 1. Shipping of Physical Goods
- **Not Applicable:** Since Aerobill is an entirely digital software product, we do not ship any physical goods or products. Therefore, there are no physical shipping addresses, tracking numbers, shipping charges, or delivery transit times involved in using our software.

## 2. Digital Delivery
- **Instant Provisioning:** Access to the Aerobill restaurant management system, admin panel, POS dashboard, and premium features is provisioned immediately upon successful registration and payment.
- **Credentials:** Your login credentials and account access links will be sent instantly to your registered email address upon successful sign-up.
- **Service Activation:** In case of any custom enterprise setup, service activation will be completed within 24 to 48 hours, or as agreed upon in writing.

## 3. Contact Us
If you have any questions regarding the delivery of our digital services, please reach out to us:
- **Email:** support@aerobill.in
- **Phone:** +91 9777295707
- **Address:** 7th Floor, DLF Cybercity, Bhubaneswar, Odisha, 751024
`

const defaultRefundPolicy = `
# Cancellation and Refund Policy

**Effective Date:** ${new Date().toLocaleDateString('en-IN')}

At Aerobill, we strive to provide the best restaurant management software and customer satisfaction. This Cancellation and Refund Policy outlines the terms for cancellation and refunds of your Aerobill subscriptions.

Aerobill is operated by **ASSETMAGNETS**.

## 1. Cancellations
- You can cancel your Aerobill subscription at any time directly through your restaurant admin dashboard, or by contacting our support team at support@aerobill.in.
- Upon cancellation, your subscription will remain active until the end of your current billing period, after which it will expire, and you will not be charged again.

## 2. Refunds
- **Digital SaaS Services:** Since Aerobill is a cloud-based Software-as-a-Service (SaaS) platform with a free plan/trial available, subscription fees are generally non-refundable once billed.
- **Technical Issues:** If you experience any technical issues with the software that we are unable to resolve within 7 business days, you are eligible for a full refund of your most recent billing cycle, provided you report the issue to support@aerobill.in within 7 days of the payment.
- **Accidental Renews:** If your subscription auto-renewed and you did not intend to continue, you may request a refund within 48 hours of the renewal payment, provided no orders or transactions were processed using the software during that renewal period.

## 3. Refund Processing
- Approved refund requests will be processed and credited back to your original payment method (via Razorpay) within **5 to 7 working days**.

## 4. Contact Us
For any cancellation or refund queries, please write to us at support@aerobill.in or call us at +91 9777295707.
`

// Get privacy policy content (public)
export async function getPrivacyPolicy() {
    try {
        let policy = await prisma.privacyPolicy.findUnique({
            where: { id: "privacy-policy" }
        })

        if (!policy) {
            policy = await prisma.privacyPolicy.create({
                data: {
                    id: "privacy-policy",
                    content: defaultPrivacyPolicy.trim()
                }
            })
        }

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to get privacy policy:", error)
        return { success: false, error: "Failed to get privacy policy", policy: { content: defaultPrivacyPolicy.trim() } }
    }
}

// Update privacy policy content (super-admin only)
export async function updatePrivacyPolicy(content: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const policy = await prisma.privacyPolicy.upsert({
            where: { id: "privacy-policy" },
            update: { content },
            create: {
                id: "privacy-policy",
                content
            }
        })

        revalidatePath("/privacy-policy")
        revalidatePath("/super-admin/privacy-policy")

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to update privacy policy:", error)
        return { success: false, error: "Failed to update privacy policy" }
    }
}

// Get Terms & Conditions content (public)
export async function getTermsConditions() {
    try {
        let policy = await prisma.termsConditions.findUnique({
            where: { id: "terms-conditions" }
        })

        if (!policy) {
            policy = await prisma.termsConditions.create({
                data: {
                    id: "terms-conditions",
                    content: defaultTermsConditions.trim()
                }
            })
        }

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to get terms and conditions:", error)
        return { success: false, error: "Failed to get terms and conditions", policy: { content: defaultTermsConditions.trim() } }
    }
}

// Update Terms & Conditions content (super-admin only)
export async function updateTermsConditions(content: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const policy = await prisma.termsConditions.upsert({
            where: { id: "terms-conditions" },
            update: { content },
            create: {
                id: "terms-conditions",
                content
            }
        })

        revalidatePath("/terms-and-conditions")
        revalidatePath("/terms")
        revalidatePath("/super-admin/terms-conditions")

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to update terms and conditions:", error)
        return { success: false, error: "Failed to update terms and conditions" }
    }
}

// Get Shipping Policy content (public)
export async function getShippingPolicy() {
    try {
        let policy = await prisma.shippingPolicy.findUnique({
            where: { id: "shipping-policy" }
        })

        if (!policy) {
            policy = await prisma.shippingPolicy.create({
                data: {
                    id: "shipping-policy",
                    content: defaultShippingPolicy.trim()
                }
            })
        }

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to get shipping policy:", error)
        return { success: false, error: "Failed to get shipping policy", policy: { content: defaultShippingPolicy.trim() } }
    }
}

// Update Shipping Policy content (super-admin only)
export async function updateShippingPolicy(content: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const policy = await prisma.shippingPolicy.upsert({
            where: { id: "shipping-policy" },
            update: { content },
            create: {
                id: "shipping-policy",
                content
            }
        })

        revalidatePath("/shipping-policy")
        revalidatePath("/super-admin/shipping-policy")

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to update shipping policy:", error)
        return { success: false, error: "Failed to update shipping policy" }
    }
}

// Get Refund Policy content (public)
export async function getRefundPolicy() {
    try {
        let policy = await prisma.refundPolicy.findUnique({
            where: { id: "refund-policy" }
        })

        if (!policy) {
            policy = await prisma.refundPolicy.create({
                data: {
                    id: "refund-policy",
                    content: defaultRefundPolicy.trim()
                }
            })
        }

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to get refund policy:", error)
        return { success: false, error: "Failed to get refund policy", policy: { content: defaultRefundPolicy.trim() } }
    }
}

// Update Refund Policy content (super-admin only)
export async function updateRefundPolicy(content: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.isSuperAdmin) {
            return { success: false, error: "Unauthorized: Super admin access required" }
        }

        const policy = await prisma.refundPolicy.upsert({
            where: { id: "refund-policy" },
            update: { content },
            create: {
                id: "refund-policy",
                content
            }
        })

        revalidatePath("/cancellations-and-refunds")
        revalidatePath("/refund-policy")
        revalidatePath("/super-admin/refund-policy")

        return { success: true, policy }
    } catch (error) {
        console.error("Failed to update refund policy:", error)
        return { success: false, error: "Failed to update refund policy" }
    }
}
