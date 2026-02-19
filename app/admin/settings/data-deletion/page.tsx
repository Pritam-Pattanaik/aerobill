"use client"

import { useState, useEffect } from "react"
import { requestDataDeletion, getMyDeletionRequest } from "@/app/actions/compliance"
import { useSession } from "next-auth/react"

export default function DataDeletionPage() {
    const { data: session } = useSession()
    const [reason, setReason] = useState("")
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [request, setRequest] = useState<any>(null)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    useEffect(() => {
        async function fetchRequest() {
            try {
                const result = await getMyDeletionRequest()
                if (result.success) {
                    setRequest(result.request)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setFetching(false)
            }
        }
        fetchRequest()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const result = await requestDataDeletion(reason)
            if (result.success) {
                setMessage({ type: "success", text: "Deletion request submitted successfully." })
                setRequest(result.request)
                setReason("")
            } else {
                setMessage({ type: "error", text: result.error || "Failed to submit request." })
            }
        } catch {
            setMessage({ type: "error", text: "An unexpected error occurred." })
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return <div className="p-8 text-center text-gray-400">Loading...</div>
    }

    return (
        <div className="p-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Data Deletion</h1>
            <p className="text-gray-400 mb-8">Request permanent deletion of your restaurant's data.</p>

            {request && request.status !== "REJECTED" ? (
                <div className="glass-card p-6 border border-[var(--border)]">
                    <h2 className="text-xl font-semibold mb-4">Current Request Status</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" :
                                request.status === "PROCESSING" ? "bg-blue-500/10 text-blue-500" :
                                    "bg-green-500/10 text-green-500"
                            }`}>
                            {request.status}
                        </span>
                        <span className="text-gray-400 text-sm">
                            Submitted on {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="bg-[var(--background)] p-4 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Reason:</p>
                        <p>{request.reason}</p>
                    </div>
                    {request.status === "COMPLETED" && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
                            Your data has been scheduled for deletion. You will lose access to your account shortly.
                        </div>
                    )}
                </div>
            ) : (
                <div className="glass-card p-8">
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
                        <h3 className="font-bold flex items-center gap-2">⚠️ Warning</h3>
                        <p className="mt-2 text-sm">
                            This action is irreversible. All your restaurant data, including orders, menu items, and customer records will be permanently deleted.
                            We may retain some data for legal compliance as required by law.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Reason for Deletion</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="input min-h-[120px]"
                                placeholder="Please tell us why you want to delete your data..."
                                required
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Deletion Request"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
