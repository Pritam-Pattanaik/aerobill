import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { format } from "date-fns"
import type { ReportData } from "@/app/actions/reports"

// Register fonts if needed (optional, using standard fonts for now)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 40,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6366F1", // Indigo
    },
    brandSubtitle: {
        fontSize: 10,
        color: "#64748B",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    restaurantInfo: {
        marginBottom: 30,
        backgroundColor: "#F8FAFC",
        padding: 15,
        borderRadius: 4,
    },
    restaurantName: {
        fontSize: 18,
        marginBottom: 5,
        color: "#1E293B",
    },
    restaurantDetail: {
        fontSize: 10,
        color: "#475569",
        marginBottom: 2,
    },
    reportTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#0F172A",
    },
    reportDate: {
        fontSize: 10,
        color: "#64748B",
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "space-between",
    },
    statCard: {
        width: "48%",
        padding: 15,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    statLabel: {
        fontSize: 10,
        color: "#64748B",
        marginBottom: 5,
        textTransform: "uppercase",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0F172A",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 8,
        color: "#94A3B8",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        paddingTop: 10,
    },
    positive: { color: "#10B981" }, // Emerald
    negative: { color: "#EF4444" }, // Red
})

type ReportPDFProps = {
    data: ReportData
}

export const ReportPDF = ({ data }: ReportPDFProps) => {
    const { restaurant } = data
    const formattedStart = format(new Date(data.dateRange.from), "MMM dd, yyyy")
    const formattedEnd = format(new Date(data.dateRange.to), "MMM dd, yyyy")
    const generatedDate = format(new Date(), "PPpp")

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.brandTitle}>Aerobill</Text>
                        <Text style={styles.brandSubtitle}>Comprehensive Restaurant Management</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: "#64748B" }}>REPORT</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    {restaurant.email && <Text style={styles.restaurantDetail}>Email: {restaurant.email}</Text>}
                    {restaurant.phone && <Text style={styles.restaurantDetail}>Phone: {restaurant.phone}</Text>}
                    {restaurant.address && <Text style={styles.restaurantDetail}>Address: {restaurant.address}</Text>}
                </View>

                {/* Report Details */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.reportTitle}>Financial & Inventory Report</Text>
                    <Text style={styles.reportDate}>Period: {formattedStart} - {formattedEnd}</Text>
                </View>

                {/* Statistics Grid */}
                <View style={styles.statsGrid}>
                    {/* Sales */}
                    <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: "#10B981" }]}>
                        <Text style={styles.statLabel}>Total Sales</Text>
                        <Text style={styles.statValue}>
                            INR {data.totalSales.toLocaleString('en-IN')}
                        </Text>
                    </View>

                    {/* Purchases */}
                    <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: "#EF4444" }]}>
                        <Text style={styles.statLabel}>Total Purchases</Text>
                        <Text style={styles.statValue}>
                            INR {data.totalPurchases.toLocaleString('en-IN')}
                        </Text>
                    </View>

                    {/* Net Profit */}
                    <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: "#3B82F6" }]}>
                        <Text style={styles.statLabel}>Net Profit / Loss</Text>
                        <Text style={[styles.statValue, data.netProfit >= 0 ? styles.positive : styles.negative]}>
                            {data.netProfit >= 0 ? "+" : ""}
                            INR {data.netProfit.toLocaleString('en-IN')}
                        </Text>
                    </View>

                    {/* Inventory */}
                    <View style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: "#F59E0B" }]}>
                        <Text style={styles.statLabel}>Inventory Value (Current)</Text>
                        <Text style={styles.statValue}>
                            INR {data.inventoryValue.toLocaleString('en-IN')}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Generated on {generatedDate} by Aerobill System</Text>
                    <Text>Page 1 of 1</Text>
                </View>
            </Page>
        </Document>
    )
}
