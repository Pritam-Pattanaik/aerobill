"use client"

import { useState, useEffect } from "react"
import { getUsers, createUser, deleteUser } from "@/app/actions/users"
import { Role } from "@prisma/client"

type User = { id: string; name: string | null; email: string | null; role: Role; createdAt: Date }

export default function UsersManagement() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "KITCHEN" as Role })
    const [error, setError] = useState("")

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const result = await getUsers()
        if (result.success) setUsers(result.users)
        setLoading(false)
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setAdding(true)

        const result = await createUser(newUser)
        if (result.success) {
            setNewUser({ name: "", email: "", password: "", role: "KITCHEN" })
            loadUsers()
            // Close modal logic if we had one, or just clear form
        } else {
            setError(result.error || "Failed to create user")
        }
        setAdding(false)
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to remove ${name}?`)) return
        const result = await deleteUser(id)
        if (result.success) {
            loadUsers()
        } else {
            alert(result.error)
        }
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Add User Form */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-6">
                        <h2 className="text-xl font-bold mb-4">Add Staff Member</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input
                                    type="text" required
                                    className="input"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email" required
                                    className="input"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="jane@aerobill.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Role</label>
                                <select
                                    className="input"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value as Role })}
                                >
                                    <option value="KITCHEN">Kitchen Staff</option>
                                    <option value="ADMIN">Manager/Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Password</label>
                                <input
                                    type="password" required
                                    className="input"
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>

                            {error && <div className="text-red-400 text-sm">{error}</div>}

                            <button disabled={adding} type="submit" className="btn-primary w-full py-2">
                                {adding ? "Adding..." : "Add User"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Users List */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="text-left py-3 px-4">Name</th>
                                        <th className="text-left py-3 px-4">Role</th>
                                        <th className="text-left py-3 px-4">Joined</th>
                                        <th className="text-right py-3 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} className="border-b border-[var(--border)] last:border-0 hover:bg-white/5">
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'OWNER' ? 'bg-purple-500/20 text-purple-400' :
                                                        user.role === 'ADMIN' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-green-500/20 text-green-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-400">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                {user.role !== 'OWNER' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name || 'User')}
                                                        className="text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-8 text-gray-500">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
