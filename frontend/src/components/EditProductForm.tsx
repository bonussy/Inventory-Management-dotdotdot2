"use client"
import React, { useEffect, useState } from "react";
import updateProduct from "@/libs/updateProduct";
import { ProductItem } from "../../interface";

export default function EditProductForm({ token, productItem }: { token: string, productItem: ProductItem }) {

    const pid = productItem.id;

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
        } catch (err: any) {
            alert(err?.message || "Update Product failed");
        }
    }

    return (
        <main className="bg-amber-50 m-5 p-5">
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4 items-center">
            <div className='text-xl font-bold text-amber-800 text-center'>Edit Product</div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='name'>Name</label>
                <input type="text" required id="name" name="name" placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='sku'>SKU</label>
                <input type='text' required id='sku' name='sku' placeholder='Stock Keeping Unit'
                value={form.sku}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='desc'>Description</label>
                <input type='text' required id='desc' name='desc' placeholder='Product Description'
                value={form.desc}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='category'>Category</label>
                <input type='text' required id='category' name='category' placeholder='Product Category'
                value={form.category}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="price">Price</label>
                <input type="number" required id="price" name="price" placeholder="0" min={0}
                value={form.price as any}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className="w-1/8 block text-gray-700 pr-4" htmlFor="stockQuantity">Stock Quantity</label>
                <input type="number" required id="stockQuantity" name="stockQuantity" placeholder="0" min={0} 
                value={form.stockQuantity as any}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="unit">Unit</label>
                <input type="text" required id="unit" name="unit" placeholder="Unit of measurement"
                value={form.unit}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="picture">Picture</label>
                <input type="text" required id="picture" name="picture" placeholder="URL to product picture"
                value={form.picture}
                onChange={handleChange}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            
            
            <button type="submit" className='bg-amber-600 hover:bg-amber-500 text-white p-2 rounded'>Save Changes</button>
            </form>
        
        </main>
    );
}