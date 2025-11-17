export default async function getRequest(token: string, requestId: string) {
    const base = "http://localhost:5000";

    const response = await fetch(`${base}/api/v1/requests/${requestId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch request");
    }

    const json = await response.json();
    return json;
}