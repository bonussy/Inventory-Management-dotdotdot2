export default async function updateProduct(
    pid: string,
    name: string,
    sku: string,
    description: string,
    category: string,
    price: number,
    stockQuantity: number,
    unit: string,
    picture: string,
    token: string
) {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log("Backend URL:", base);
    const response = await fetch(`${base}/api/v1/products/${pid}`, {
        method: "PUT",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            name: name,
            sku: sku,
            description: description,
            category: category,
            price: price,
            stockQuantity: stockQuantity,
            unit: unit,
            picture: picture,
            isActive: true
         })
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(errText || "Update Product failed");
    }

    return await response.json();
}