export default async function getProduct(pid: string) {

    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log("Backend URL:", base);
    const response = await fetch(`${base}/api/v1/products/${pid}`)
    if(!response.ok) {
        throw new Error("Failed to fetch product")
    }
    return await response.json()
}