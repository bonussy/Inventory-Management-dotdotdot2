export default async function getProduct(pid: string) {

    const base = "http://localhost:5000"
    const response = await fetch(`${base}/api/v1/products/${pid}`)
    if(!response.ok) {
        throw new Error("Failed to fetch product")
    }
    return await response.json()
}