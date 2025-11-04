export default async function getProducts() {
    
    const base = "http://localhost:5000"
    const response = await fetch(`${base}/api/v1/products`)
    if(!response.ok) {
        throw new Error("Failed to fetch products")
    }
    return await response.json()
}