export default async function updateRequest(token: string, requestId: string, payload: {
    transactionType?: "stockIn" | "stockOut",
    product_id?: string,
    itemAmount?: number
}) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${base}/api/v1/requests/${requestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error("Failed to update request");
    }
    const json = await response.json();
    return json.data;
}