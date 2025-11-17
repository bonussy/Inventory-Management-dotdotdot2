export default async function getRequests(token: string) {
    const base = "http://localhost:5000";
    const response = await fetch(`${base}/api/v1/requests`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests");
    }
    return await response.json();
}