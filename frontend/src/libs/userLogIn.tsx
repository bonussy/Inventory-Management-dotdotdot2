export default async function userLogIn(userEmail: string, userPassword: string) {
    const base = "http://localhost:5000"
    const response = await fetch(`${base}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cars");
    }

    return await response.json();
}