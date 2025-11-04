export default async function createProduct(
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
    const base = "http://localhost:5000"
    const response = await fetch(`${base}/api/v1/products`, {
        method: "POST",
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
        throw new Error(errText || "Creat Product failed");
    }

    return await response.json();
}