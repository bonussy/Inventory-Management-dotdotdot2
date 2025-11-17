'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import updateRequest from '@/libs/updateRequest';
import getProducts from '@/libs/getProducts';
import { ProductItem, RequestItem } from '../../interface';

export default function EditRequestForm({
    token,
    requestItem,
}: {
    token: string;
    requestItem: RequestItem;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductItem[]>([]);

    const [formData, setFormData] = useState<{
        transactionType: 'stockIn' | 'stockOut';
        product_id: string;
        itemAmount: string;
    }>({
        transactionType: 'stockIn',
        product_id: '',
        itemAmount: '',
    });

    // Pre-fill form with request data
    useEffect(() => {
        if (requestItem) {
            setFormData({
                transactionType: requestItem.transactionType ?? 'stockIn',
                product_id:
                    typeof requestItem.product_id === 'string'
                        ? requestItem.product_id
                        : requestItem.product_id?._id ?? '',
                itemAmount: String(requestItem.itemAmount ?? ''),
            });
        }
    }, [requestItem]);

    // Load products for dropdown
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts();
                setProducts(res.data);
            } catch (err: any) {
                alert(err?.message || 'Failed to load products');
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const selectedProduct = products.find(p => p._id === formData.product_id);
        const requestedAmount = Number(formData.itemAmount);

        if (
            formData.transactionType === 'stockOut' &&
            selectedProduct &&
            requestedAmount > selectedProduct.stockQuantity
        ) {
            alert(
                `Cannot stock out more than available quantity.\nAvailable: ${selectedProduct.stockQuantity}, Requested: ${requestedAmount}`
            );
            setLoading(false);
            return;
        }

        try {
            await updateRequest(token, requestItem._id, {
                transactionType: formData.transactionType,
                product_id: formData.product_id,
                itemAmount: requestedAmount,
            });
            alert('Request updated successfully');
            router.push('/request');
        } catch (err: any) {
            alert(err?.message || 'Failed to update request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Edit Request
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        Update your stock in/out request
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Transaction Type & Product Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="transactionType"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Transaction Type
                                </label>
                                <select
                                    id="transactionType"
                                    name="transactionType"
                                    value={formData.transactionType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                >
                                    <option value="stockIn">Stock In</option>
                                    <option value="stockOut">Stock Out</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="product_id"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Product
                                </label>
                                <select
                                    id="product_id"
                                    name="product_id"
                                    value={formData.product_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                                >
                                    <option value="">Select a product</option>
                                    {products.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name} ({p.sku}) — Stock: {p.stockQuantity}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Item Amount */}
                        <div>
                            <label
                                htmlFor="itemAmount"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Item Amount
                            </label>
                            <input
                                type="number"
                                id="itemAmount"
                                name="itemAmount"
                                placeholder="Enter item amount"
                                value={formData.itemAmount}
                                onChange={handleChange}
                                required
                                min={1}
                                className="w-full px-4 py-3 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                            />
                        </div>

                        {/* Submit & Cancel */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 
                           hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 
                           text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] 
                           active:scale-[0.98] shadow-md"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                disabled={loading}
                                className="flex-1 w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 
                           font-semibold py-3 rounded-lg transition disabled:opacity-50"
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