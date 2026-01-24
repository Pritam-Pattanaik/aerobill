"use client"

import { useState, useTransition, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getRestaurantReport, type ReportData } from "@/app/actions/reports"
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
import { ReportPDF } from "./ReportPDF"

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <button className="px-4 py-2 rounded-xl bg-slate-800 text-gray-500 text-sm font-medium">Loading PDF...</button>,
    }
)

export default function ReportsPage() {
    const { data: session, status } = useSession()
    const [isPending, startTransition] = useTransition()
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Filter States
    const [filterType, setFilterType] = useState<"monthly" | "custom">("monthly")
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))
    const [customStart, setCustomStart] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"))
    const [customEnd, setCustomEnd] = useState(format(new Date(), "yyyy-MM-dd"))

    // Initial load
    useEffect(() => {
        if (status === "authenticated" && session?.user?.restaurantId) {
            handleGenerateReport()
        }
    }, [status, session])

    if (status === "unauthenticated") {
        redirect("/login")
    }

    const handleGenerateReport = () => {
        setError(null)
        const restaurantId = session?.user?.restaurantId
        if (!restaurantId) return

        let start: Date
        let end: Date

        if (filterType === "monthly") {
            const date = new Date(selectedMonth + "-01") // Append day to make it valid
            start = startOfMonth(date)
            end = endOfMonth(date)
        } else {
            start = new Date(customStart)
            end = new Date(customEnd)
            // Fix time for end date to include the full day if manually entered without time
            // effectively handled by server action endOfDay(), but good to be precise
        }

        startTransition(async () => {
            const result = await getRestaurantReport(restaurantId, start, end)
            if (result.success && result.data) {
                setReportData(result.data)
            } else {
                setError(result.error || "Failed to fetch report")
            }
        })
    }

    if (status === "loading") {
        return <div className="p-6 text-gray-400">Loading...</div>
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Reports & Analytics
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Track your restaurant's performance, sales, and inventory value.
                </p>
            </div>

            {/* Controls */}
            <div className="glass-card p-4 md:p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
                    {/* Left: Filters */}
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        {/* Filter Type Toggle */}
                        <div className="bg-slate-800/50 p-1 rounded-lg flex inline-flex w-fit">
                            <button
                                onClick={() => setFilterType("monthly")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterType === "monthly"
                                    ? "bg-indigo-500 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setFilterType("custom")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterType === "custom"
                                    ? "bg-indigo-500 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Custom Date
                            </button>
                        </div>

                        {/* Date Inputs */}
                        {filterType === "monthly" ? (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-gray-400 ml-1">Select Month</label>
                                <input
                                    type="month"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 ml-1">From</label>
                                    <input
                                        type="date"
                                        value={customStart}
                                        onChange={(e) => setCustomStart(e.target.value)}
                                        className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 ml-1">To</label>
                                    <input
                                        type="date"
                                        value={customEnd}
                                        onChange={(e) => setCustomEnd(e.target.value)}
                                        className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex gap-3 w-full md:w-auto">
                        {/* Generate Button */}
                        <button
                            onClick={handleGenerateReport}
                            disabled={isPending}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <span>Generate Report</span>
                                    <span>🚀</span>
                                </>
                            )}
                        </button>

                        {/* PDF Download Button */}
                        {reportData && (
                            <PDFDownloadLink
                                document={<ReportPDF data={reportData} />}
                                fileName={`Report_${filterType === 'monthly' ? selectedMonth : `${customStart}_${customEnd}`}.pdf`}
                                className="flex-1 md:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium border border-slate-700 transition-all flex items-center justify-center gap-2"
                            >
                                {/* @ts-ignore - render prop type mismatch in some versions */}
                                {({ blob, url, loading, error }) => (
                                    loading ? 'Preparing...' : (
                                        <>
                                            <span>Download PDF</span>
                                            <span>📥</span>
                                        </>
                                    )
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>
                {error && <p className="text-red-400 mt-4 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
            </div>

            {/* Results Grid */}
            {reportData && (
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Sales Card */}
                    <div className="glass-card p-6 border-t-4 border-t-emerald-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl">💰</span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Total Sales</p>
                        <h3 className="text-3xl font-bold mt-2 text-white">
                            ₹{reportData.totalSales.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-emerald-400 mt-2 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                            Revenue generated
                        </p>
                    </div>

                    {/* Purchases Card */}
                    <div className="glass-card p-6 border-t-4 border-t-red-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl">🛒</span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Total Purchases</p>
                        <h3 className="text-3xl font-bold mt-2 text-white">
                            ₹{reportData.totalPurchases.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-red-400 mt-2 bg-red-500/10 w-fit px-2 py-1 rounded">
                            Marketplace + Daily
                        </p>
                    </div>

                    {/* Net Profit Card */}
                    <div className="glass-card p-6 border-t-4 border-t-blue-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl">📊</span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Net Profit / Loss</p>
                        <h3 className={`text-3xl font-bold mt-2 ${reportData.netProfit >= 0 ? "text-blue-400" : "text-red-400"}`}>
                            {reportData.netProfit >= 0 ? "+" : ""}₹{reportData.netProfit.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-blue-400 mt-2 bg-blue-500/10 w-fit px-2 py-1 rounded">
                            Sales - Purchases
                        </p>
                    </div>

                    {/* Inventory Value Card */}
                    <div className="glass-card p-6 border-t-4 border-t-orange-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl">📦</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-400 font-medium">Inventory Value</p>
                            <span className="text-[10px] bg-gray-700 px-1.5 py-0.5 rounded text-gray-300" title="Based on current stock levels">CURRENT</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-2 text-white">
                            ₹{reportData.inventoryValue.toLocaleString('en-IN')}
                        </h3>
                        <p className="text-xs text-orange-400 mt-2 bg-orange-500/10 w-fit px-2 py-1 rounded">
                            Total Asset Value
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
