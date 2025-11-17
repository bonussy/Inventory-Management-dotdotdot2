export default async function getRequests(token: string) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${base}/api/v1/requests`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests");
    }
    return await response.json();
}