export default async function deleteProduct(pid: string, token: string) {

    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${base}/api/v1/products/${pid}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!response.ok) {
        throw new Error("Failed to delete product")
    }
    return await response.json()
}