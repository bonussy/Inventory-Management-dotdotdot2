export default async function userRegister(userName: string, userEmail: string, userTel: string, userRole: string, userPassword: string,) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${base}/api/v1/auth/register`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            name: userName,
            email: userEmail,
            tel: userTel,
            role: userRole,
            password: userPassword
         })
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(errText || "Registration failed");
    }

    return await response.json();
}