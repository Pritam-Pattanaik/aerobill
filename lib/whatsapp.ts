/**
 * Green API WhatsApp Integration
 * Sends WhatsApp messages using Green API
 */

type WhatsAppConfig = {
    instanceId: string
    token: string
}

type SendMessageResult = {
    success: boolean
    messageId?: string
    error?: string
}

/**
 * Send a WhatsApp message using Green API
 * @param phone - Phone number with country code (e.g., "919876543210")
 * @param message - Message to send
 * @param config - Green API credentials
 */
export async function sendWhatsAppMessage(
    phone: string,
    message: string,
    config: WhatsAppConfig
): Promise<SendMessageResult> {
    try {
        // Clean phone number - remove spaces, dashes, and + prefix
        const cleanPhone = phone.replace(/[\s\-\+]/g, "")

        // Add country code if not present (assume India)
        const formattedPhone = cleanPhone.startsWith("91")
            ? cleanPhone
            : `91${cleanPhone}`

        const url = `https://api.green-api.com/waInstance${config.instanceId}/sendMessage/${config.token}`

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatId: `${formattedPhone}@c.us`,
                message: message
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("WhatsApp API error:", errorText)
            return { success: false, error: `API error: ${response.status}` }
        }

        const data = await response.json()
        return { success: true, messageId: data.idMessage }

    } catch (error) {
        console.error("Failed to send WhatsApp message:", error)
        return { success: false, error: String(error) }
    }
}

/**
 * Format the thank you message with placeholders
 */
export function formatThankYouMessage(
    template: string,
    restaurantName: string,
    amount: number
): string {
    return template
        .replace("{restaurant}", restaurantName)
        .replace("{amount}", amount.toFixed(0))
}
