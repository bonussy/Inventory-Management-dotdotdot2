'use client'
import Link from "next/link";
import Card from "./Card";
import { ProductItem, ProductJson } from "../../interface";
import { useRouter } from "next/navigation";
import deleteProduct from "@/libs/deleteProduct";
import { useState } from "react";

export default function ProductCatalog({productsJson, userRole, token}: {productsJson: ProductJson, userRole?: string, token?: string}) {

    const router = useRouter();

    // local state for immediate UI updates
    const [items, setItems] = useState<ProductItem[]>(productsJson.data);
    const [count, setCount] = useState<number>(productsJson.count);

    const handleEdit = (productId: string) => {
        console.log('Edit product:', productId);
        router.push(`/product/${productId}/edit`);
    };

    const handleDelete = async (productId: string) => {
        // optimistic UI: remove locally first
        const prevItems = items;
        const prevCount = count;
        setItems(prev => prev.filter(p => p.id !== productId));
        setCount(prev => Math.max(0, prev - 1));

        try{
            await deleteProduct(productId, String(token));
            // optionally show toast instead of alert
            alert("Product deleted successfully, isActive set to false");
        } catch(err: any){
            // restore on error
            setItems(prevItems);
            setCount(prevCount);
            alert(err?.message || "Failed to delete product");
        }
        console.log('Delete product:', productId);
    };

    return (
        <>
            <div className="text-center mb-4">Explore <strong>{count}</strong> products in our catalog</div>

            {/* Responsive grid: 1 col xs, 2 cols sm/md, 4 cols lg+ */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {
                    items.map((productItem: ProductItem) => (
                        <Link 
                            href={`/product/${productItem.id}`} 
                            key={productItem.id} 
                            className="block"
                            aria-label={`View ${productItem.name}`}
                        >
                            <Card 
                                productName={productItem.name} 
                                imgSrc={productItem.picture} 
                                userRole={userRole}
                                onEdit={() => handleEdit(productItem.id)}
                                onDelete={() => handleDelete(productItem.id)}
                            />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}