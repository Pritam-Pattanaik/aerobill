"use client"

import { useState, useEffect } from "react"
import { getTables, createTables, toggleTableStatus, deleteTable } from "@/app/actions/tables"

type Table = { id: string; number: number; isActive: boolean }

export default function TablesManagement() {
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)
    const [addCount, setAddCount] = useState("1")
    const [adding, setAdding] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)
    const [qrDataUrl, setQrDataUrl] = useState("")

    useEffect(() => {
        getTables().then(r => { if (r.success) setTables(r.tables); setLoading(false) })
    }, [])

    const handleCreate = async () => {
        const count = parseInt(addCount)
        if (isNaN(count) || count < 1) return
        setAdding(true)
        await createTables(count)
        const r = await getTables()
        if (r.success) setTables(r.tables)
        setAdding(false)
        setAddCount("1")
    }

    const handleToggle = async (id: string) => {
        await toggleTableStatus(id)
        const r = await getTables()
        if (r.success) setTables(r.tables)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this table?")) return
        const result = await deleteTable(id)
        if (!result.success) alert(result.error)
        const r = await getTables()
        if (r.success) setTables(r.tables)
    }

    const generateQR = async (table: Table) => {
        setSelectedTable(table)
        // Dynamic import QR code library only when needed
        const QRCode = (await import("qrcode")).default
        const url = `${window.location.origin}/table/${table.number}`
        const dataUrl = await QRCode.toDataURL(url, { width: 250, margin: 1 })
        setQrDataUrl(dataUrl)
    }

    const downloadQR = () => {
        if (!qrDataUrl || !selectedTable) return
        const link = document.createElement("a")
        link.download = `table-${selectedTable.number}-qr.png`
        link.href = qrDataUrl
        link.click()
    }

    if (loading) return <div className="p-6 text-center">Loading...</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Tables</h1>
                    <p className="text-gray-400 text-sm">Manage tables & QR codes</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="number" min="1" max="50" value={addCount}
                        onChange={e => setAddCount(e.target.value)}
                        className="input w-16 py-2"
                    />
                    <button onClick={handleCreate} disabled={adding} className="btn-primary py-2">
                        {adding ? "..." : "+ Add"}
                    </button>
                </div>
            </div>

            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {tables.map(table => (
                    <div key={table.id} className={`glass-card p-4 text-center ${!table.isActive ? "opacity-50" : ""}`}>
                        <div className="text-3xl font-bold mb-1">{table.number}</div>
                        <div className={`text-xs mb-3 ${table.isActive ? "text-green-400" : "text-red-400"}`}>
                            {table.isActive ? "Active" : "Inactive"}
                        </div>
                        <button onClick={() => generateQR(table)} className="w-full btn-secondary text-xs py-1.5 mb-2">
                            📱 QR
                        </button>
                        <div className="flex gap-1">
                            <button onClick={() => handleToggle(table.id)} className="flex-1 text-xs py-1 rounded bg-[var(--card)]">
                                {table.isActive ? "Off" : "On"}
                            </button>
                            <button onClick={() => handleDelete(table.id)} className="flex-1 text-xs py-1 rounded bg-[var(--card)] text-red-400">
                                Del
                            </button>
                        </div>
                    </div>
                ))}
                {tables.length === 0 && <div className="col-span-full text-center py-8 text-gray-500">No tables</div>}
            </div>

            {selectedTable && qrDataUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => { setSelectedTable(null); setQrDataUrl("") }} />
                    <div className="glass-card p-6 relative z-10 text-center">
                        <h2 className="text-xl font-bold mb-4">Table {selectedTable.number}</h2>
                        <div className="bg-white p-3 rounded-lg inline-block mb-4">
                            <img src={qrDataUrl} alt="QR" className="w-48 h-48" />
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button onClick={downloadQR} className="btn-secondary py-2 px-4">Download</button>
                            <button onClick={() => { setSelectedTable(null); setQrDataUrl("") }} className="btn-primary py-2 px-4">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
