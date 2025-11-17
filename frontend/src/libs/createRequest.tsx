export default async function createRequest(
    transactionType: "stockIn" | "stockOut",
    product_id: string,
    itemAmount: number,
    token: string
) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${base}/api/v1/requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            transactionType,
            product_id,
            itemAmount,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create request");
    }

    return await response.json(); // returns the new request object
}