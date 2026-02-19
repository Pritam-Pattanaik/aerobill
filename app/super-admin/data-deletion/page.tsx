"use client"

import { useState, useEffect } from "react"
import { getAllDeletionRequests, updateDeletionStatus } from "@/app/actions/compliance"
import { DeletionStatus } from "@prisma/client"

type Request = {
    id: string
    restaurant: {
        name: string
        email: string
        phone: string | null
    }
    reason: string
    status: DeletionStatus
    adminNote: string | null
    createdAt: Date
}

export default function DataRequestsPage() {
    const [requests, setRequests] = useState<Request[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchRequests()
    }, [])

    const fetchRequests = async () => {
        try {
            const result = await getAllDeletionRequests()
            if (result.success && result.requests) {
                setRequests(result.requests as unknown as Request[])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (id: string, status: DeletionStatus) => {
        if (!confirm(`Are you sure you want to change the status to ${status}?`)) return

        setUpdating(id)
        try {
            const result = await updateDeletionStatus(id, status)
            if (result.success) {
                // Optimistic update
                setRequests(requests.map(r => r.id === id ? { ...r, status } : r))
            } else {
                alert("Failed to update status")
            }
        } catch {
            alert("An error occurred")
        } finally {
            setUpdating(null)
        }
    }

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Data Deletion Requests</h1>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                        <tr>
                            <th className="p-4">Restaurant</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400">
                                    No deletion requests found.
                                </td>
                            </tr>
                        ) : requests.map((req) => (
                            <tr key={req.id} className="hover:bg-[var(--card)]/50">
                                <td className="p-4">
                                    <div className="font-medium">{req.restaurant.name}</div>
                                    <div className="text-sm text-gray-400">{req.restaurant.email}</div>
                                    <div className="text-sm text-gray-400">{req.restaurant.phone}</div>
                                </td>
                                <td className="p-4">
                                    <div className="max-w-xs truncate" title={req.reason}>
                                        {req.reason}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" :
                                            req.status === "PROCESSING" ? "bg-blue-500/10 text-blue-500" :
                                                req.status === "COMPLETED" ? "bg-green-500/10 text-green-500" :
                                                    "bg-red-500/10 text-red-500"
                                        }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-400">
                                    {new Date(req.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {req.status !== "COMPLETED" && req.status !== "REJECTED" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(req.id, "PROCESSING")}
                                                    disabled={updating === req.id}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded"
                                                    title="Mark as Processing"
                                                >
                                                    ⏳
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(req.id, "COMPLETED")}
                                                    disabled={updating === req.id}
                                                    className="p-2 text-green-400 hover:bg-green-500/10 rounded"
                                                    title="Mark as Completed"
                                                >
                                                    ✅
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(req.id, "REJECTED")}
                                                    disabled={updating === req.id}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                                                    title="Reject"
                                                >
                                                    ❌
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
