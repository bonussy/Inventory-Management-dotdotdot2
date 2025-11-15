'use client'
import { useState } from 'react';
import createProduct from '@/libs/createProduct';
import { useRouter } from 'next/navigation';

export default function AddProductForm({ token }: { token: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        desc: '',
        category: '',
        price: '',
        stockQuantity: '',
        unit: '',
        picture: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createProduct(
                formData.name,
                formData.sku,
                formData.desc,
                formData.category,
                Number(formData.price),
                Number(formData.stockQuantity),
                formData.unit,
                formData.picture,
                token
            );
            alert('Product created successfully');
            router.push('/product');
        } catch (err: any) {
            alert(err?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create New Product</h1>
                    <p className="text-sm sm:text-base text-gray-600">Add a new product to your inventory</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Name & SKU Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="e.g., Organic Coffee"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
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
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
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
                                value={formData.desc}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Category & Unit Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <input 
                                    type="text" 
                                    id="category" 
                                    name="category" 
                                    placeholder="e.g., Beverages"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
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
                                    value={formData.unit}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Price & Stock Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-9 pr-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
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
                                    value={formData.stockQuantity}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
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
                                value={formData.picture}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex-1 w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                            >
                                {loading ? 'Creating...' : 'Create Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition"
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