export default async function deleteRequest(token: string, requestId: string) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${base}/api/v1/requests/${requestId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error("Failed to delete request");
    }
    const json = await response.json();
    return json.data;
}