"use client"
import React, { useEffect, useState } from "react";
import updateProduct from "@/libs/updateProduct";
import { ProductItem } from "../../interface";
import { useRouter } from "next/navigation";

export default function EditProductForm({ token, productItem }: { token: string, productItem: ProductItem }) {

    const router = useRouter();
    const pid = productItem.id;
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        sku: "",
        desc: "",
        category: "",
        price: 0,
        stockQuantity: 0,
        unit: "",
        picture: ""
    });

    useEffect(() => {
        if (productItem) {
            setForm({
                name: productItem.name ?? "",
                sku: productItem.sku ?? "",
                desc: productItem.description ?? "",
                category: productItem.category ?? "",
                price: Number(productItem.price ?? 0),
                stockQuantity: Number(productItem.stockQuantity ?? 0),
                unit: productItem.unit ?? "",
                picture: productItem.picture ?? ""
            });
        }
    }, [productItem]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? "" : Number(value)) : value
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProduct(
                pid,
                String(form.name),
                String(form.sku),
                String(form.desc),
                String(form.category),
                Number(form.price),
                Number(form.stockQuantity),
                String(form.unit),
                String(form.picture),
                token
            );
            alert("Product updated successfully");
            router.push('/product');
        } catch (err: any) {
            alert(err?.message || "Update Product failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Product</h1>
                    <p className="text-gray-600">Update product information</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Name & SKU Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="e.g., Organic Coffee"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">
                                    SKU
                                </label>
                                <input 
                                    type="text" 
                                    id="sku" 
                                    name="sku" 
                                    placeholder="e.g., COFFEE-001"
                                    value={form.sku}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="desc" className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <input 
                                type="text" 
                                id="desc" 
                                name="desc" 
                                placeholder="Enter product description"
                                value={form.desc}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Category & Unit Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <input 
                                    type="text" 
                                    id="category" 
                                    name="category" 
                                    placeholder="e.g., Beverages"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="unit" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Unit
                                </label>
                                <input 
                                    type="text" 
                                    id="unit" 
                                    name="unit" 
                                    placeholder="e.g., kg, lbs, pieces"
                                    value={form.unit}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Price & Stock Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500">$</span>
                                    <input 
                                        type="number" 
                                        id="price" 
                                        name="price" 
                                        placeholder="0.00" 
                                        min="0" 
                                        step="0.01"
                                        value={form.price as any}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="stockQuantity" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Stock Quantity
                                </label>
                                <input 
                                    type="number" 
                                    id="stockQuantity" 
                                    name="stockQuantity" 
                                    placeholder="0" 
                                    min="0"
                                    value={form.stockQuantity as any}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Picture URL */}
                        <div>
                            <label htmlFor="picture" className="block text-sm font-semibold text-gray-700 mb-2">
                                Picture URL
                            </label>
                            <input 
                                type="text" 
                                id="picture" 
                                name="picture" 
                                placeholder="https://example.com/image.jpg"
                                value={form.picture}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex gap-3">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}