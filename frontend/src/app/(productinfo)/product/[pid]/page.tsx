import Image from "next/image";
import getProduct from "@/libs/getProduct";

export default async function ProductDetailPage({params}: {params: Promise<{pid:string}>}) {
    const {pid} = await params;
    const productDetail = await getProduct(pid);

    if (!productDetail || !productDetail.data) return null;

    const p = productDetail.data;

    return (
    <main className="text-center p-5 bg-amber-50">
        <h1 className="text-2xl font-bold mb-4">{p.name}</h1>

        <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="md:w-1/3 w-full">
            {p.picture ? (
            <Image
                src={p.picture}
                alt={p.name || "Product image"}
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-lg object-cover w-full h-auto bg-gray-100"
            />
            ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No image
            </div>
            )}
        </div>

        <div className="md:w-2/3 w-full text-left space-y-2">
            <div className="text-sm text-gray-600"><span className="font-medium">SKU:</span> {p.sku || "-"}</div>
            <div className="text-sm text-gray-600"><span className="font-medium">Category:</span> {p.category || "-"}</div>
            <div className="text-sm text-gray-600"><span className="font-medium">Unit:</span> {p.unit || "-"}</div>
            <div className="text-sm text-gray-600"><span className="font-medium">Stock:</span> {p.stockQuantity || "-"}</div>
            <div className="text-sm text-gray-600"><span className="font-medium">Price:</span> {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price ?? "-"}</div>

            <div className="pt-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{p.description || p.desc || "No description provided."}</p>
            </div>
        </div>
        </div>
    </main>
    );
}