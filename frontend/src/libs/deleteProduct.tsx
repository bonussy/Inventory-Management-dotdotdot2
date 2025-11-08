export default async function deleteProduct(pid: string, token: string) {

    const base = "http://localhost:5000"
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