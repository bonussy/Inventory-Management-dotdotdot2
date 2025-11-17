export default async function getProducts() {
    
    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${base}/api/v1/products`)
    if(!response.ok) {
        throw new Error("Failed to fetch products")
    }
    return await response.json()
}