export default async function getUserProfile(token:string) {

    const base = "http://localhost:5000"
    const response = await fetch(`${base}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return await response.json();
}