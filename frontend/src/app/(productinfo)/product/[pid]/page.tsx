import Image from "next/image";
import getProduct from "@/libs/getProduct";
import Link from "next/link";

export default async function ProductDetailPage({params}: {params: Promise<{pid:string}>}) {
    const {pid} = await params;
    const productDetail = await getProduct(pid);

    if (!productDetail || !productDetail.data) return null;

    const p = productDetail.data;

    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link 
                    href="/product" 
                    className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 transition"
                >
                    ← Back to Products
                </Link>

                {/* Product Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Image Section */}
                        <div className="flex items-center justify-center bg-gradient-to-b from-amber-50 to-white rounded-xl p-6">
                            {p.picture ? (
                                <Image
                                    src={p.picture}
                                    alt={p.name || "Product image"}
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="rounded-lg object-contain w-full h-auto max-h-96"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                    No image available
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col justify-between">
                            {/* Header */}
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{p.name}</h1>
                                <p className="text-amber-600 text-lg font-semibold mb-6">
                                    {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price ?? "-"}
                                </p>

                                {/* Stock Status */}
                                <div className="mb-6">
                                    {p.stockQuantity > 0 ? (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                            ✓ In Stock ({p.stockQuantity})
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                            ✕ Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">SKU</p>
                                    <p className="text-lg font-semibold text-gray-900">{p.sku || "-"}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Category</p>
                                    <p className="text-lg font-semibold text-gray-900">{p.category || "-"}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Unit</p>
                                    <p className="text-lg font-semibold text-gray-900">{p.unit || "-"}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Quantity</p>
                                    <p className="text-lg font-semibold text-gray-900">{p.stockQuantity || "0"}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{p.description || p.desc || "No description provided."}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}