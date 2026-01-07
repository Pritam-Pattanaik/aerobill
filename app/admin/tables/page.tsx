"use client"

import { useState, useEffect, useRef } from "react"
import { getTables, createTables, toggleTableStatus, deleteTable } from "@/app/actions/tables"
import QRCode from "qrcode"

type Table = {
    id: string
    number: number
    isActive: boolean
}

export default function TablesManagement() {
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)
    const [addCount, setAddCount] = useState("1")
    const [adding, setAdding] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)
    const [qrDataUrl, setQrDataUrl] = useState<string>("")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const fetchTables = async () => {
        try {
            const result = await getTables()
            if (result.success) {
                setTables(result.tables)
            }
        } catch (error) {
            console.error("Failed to fetch tables:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTables()
    }, [])

    const handleCreateTables = async () => {
        const count = parseInt(addCount)
        if (isNaN(count) || count < 1) return

        setAdding(true)
        try {
            await createTables(count)
            fetchTables()
        } finally {
            setAdding(false)
            setAddCount("1")
        }
    }

    const handleToggleStatus = async (id: string) => {
        await toggleTableStatus(id)
        fetchTables()
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this table?")) {
            const result = await deleteTable(id)
            if (!result.success) {
                alert(result.error)
            }
            fetchTables()
        }
    }

    const generateQR = async (table: Table) => {
        setSelectedTable(table)
        const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
        const url = `${baseUrl}/table/${table.number}`

        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            })
            setQrDataUrl(dataUrl)
        } catch (error) {
            console.error("Failed to generate QR code:", error)
        }
    }

    const downloadQR = () => {
        if (!qrDataUrl || !selectedTable) return

        const link = document.createElement("a")
        link.download = `table-${selectedTable.number}-qr.png`
        link.href = qrDataUrl
        link.click()
    }

    const printQR = () => {
        if (!qrDataUrl || !selectedTable) return

        const printWindow = window.open("", "_blank")
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>Table ${selectedTable.number} QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              h1 { margin-bottom: 20px; }
              img { max-width: 300px; }
              p { margin-top: 20px; color: #666; }
            </style>
          </head>
          <body>
            <h1>Table ${selectedTable.number}</h1>
            <img src="${qrDataUrl}" alt="QR Code" />
            <p>Scan to view menu and order</p>
          </body>
        </html>
      `)
            printWindow.document.close()
            printWindow.print()
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading tables...</div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Table Management</h1>
                    <p className="text-gray-400">Manage tables and generate QR codes</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={addCount}
                        onChange={(e) => setAddCount(e.target.value)}
                        className="input w-20"
                    />
                    <button
                        onClick={handleCreateTables}
                        disabled={adding}
                        className="btn-primary"
                    >
                        {adding ? "Adding..." : "+ Add Tables"}
                    </button>
                </div>
            </div>

            {/* Tables grid */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className={`glass-card p-6 text-center ${!table.isActive ? "opacity-60" : ""
                            }`}
                    >
                        <div className="text-4xl font-bold mb-2">{table.number}</div>
                        <div
                            className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${table.isActive
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                        >
                            {table.isActive ? "Active" : "Inactive"}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => generateQR(table)}
                                className="w-full btn-secondary text-sm py-2"
                            >
                                📱 View QR
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggleStatus(table.id)}
                                    className={`flex-1 text-xs py-2 rounded-lg ${table.isActive
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-green-500/20 text-green-400"
                                        }`}
                                >
                                    {table.isActive ? "Disable" : "Enable"}
                                </button>
                                <button
                                    onClick={() => handleDelete(table.id)}
                                    className="flex-1 text-xs py-2 rounded-lg bg-[var(--card)] text-gray-400 hover:text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {tables.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No tables yet. Add some tables to get started!
                    </div>
                )}
            </div>

            {/* QR Code Modal */}
            {selectedTable && qrDataUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => {
                            setSelectedTable(null)
                            setQrDataUrl("")
                        }}
                    />
                    <div className="glass-card p-8 relative z-10 animate-fadeIn text-center">
                        <h2 className="text-2xl font-bold mb-6">Table {selectedTable.number}</h2>

                        <div className="bg-white p-4 rounded-xl inline-block mb-6">
                            <img src={qrDataUrl} alt={`Table ${selectedTable.number} QR Code`} className="w-64 h-64" />
                        </div>

                        <p className="text-sm text-gray-400 mb-6">
                            URL: {typeof window !== "undefined" ? window.location.origin : ""}/table/{selectedTable.number}
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button onClick={downloadQR} className="btn-secondary">
                                ⬇️ Download
                            </button>
                            <button onClick={printQR} className="btn-primary">
                                🖨️ Print
                            </button>
                        </div>

                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>
            )}
        </div>
    )
}
