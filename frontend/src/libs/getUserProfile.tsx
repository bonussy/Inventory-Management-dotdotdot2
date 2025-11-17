export default async function getUserProfile(token:string) {

    const base = process.env.NEXT_PUBLIC_BACKEND_URL
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