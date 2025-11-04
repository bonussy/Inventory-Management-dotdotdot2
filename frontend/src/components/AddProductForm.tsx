"use client"
import React from "react";
import createProduct from "@/libs/createProduct";

export default function AddProductForm({ token }: { token: string }) {

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const sku = formData.get("sku") as string;
        const description = formData.get("desc") as string;
        const category = formData.get("category") as string;
        const price = Number(formData.get("price"));
        const stockQuantity = Number(formData.get("stockQuantity"));
        const unit = formData.get("unit") as string;
        const picture = formData.get("picture") as string;

        // console.log({name, sku, description, category, price, stockQuantity, unit, picture, token});
        try {
            await createProduct(name, sku, description, category, price, stockQuantity, unit, picture, token);
            alert("Product created successfully");
            form.reset();
        } catch (err: any) {
            alert(err?.message || "Create Product failed");
        }
    }

    return (
        <main className="bg-amber-50 m-5 p-5">
            <form onSubmit={handleSubmit}  className="flex flex-col gap-4 items-center">
            <div className='text-xl font-bold text-amber-800 text-center'>Create Product</div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='name'>Name</label>
                <input type="text" required id="name" name="name" placeholder="Product Name"
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='sku'>SKU</label>
                <input type='text' required id='sku' name='sku' placeholder='Stock Keeping Unit'
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='desc'>Description</label>
                <input type='text' required id='desc' name='desc' placeholder='Product Description'
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor='category'>Category</label>
                <input type='text' required id='category' name='category' placeholder='Product Category'
                className='bg-white border-2 border-gray-200 rounded w-full p-2 
                text-gray-700 focus:outline-none focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="price">Price</label>
                <input type="number" required id="price" name="price" placeholder="0" min={0}
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className="w-1/8 block text-gray-700 pr-4" htmlFor="stockQuantity">Stock Quantity</label>
                <input type="number" required id="stockQuantity" name="stockQuantity" placeholder="0" min={0} 
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="unit">Unit</label>
                <input type="text" required id="unit" name="unit" placeholder="Unit of measurement"
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            <div className='flex items-center w-2/3 my-2'>
                <label className='w-1/8 block text-gray-700 pr-4' htmlFor="picture">Picture</label>
                <input type="text" required id="picture" name="picture" placeholder="URL to product picture"
                className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:border-amber-400'/>
            </div>
            
            
            <button type="submit" className='bg-amber-600 hover:bg-amber-500 text-white p-2 rounded'>Add New Product</button>
            </form>
        
        </main>
    );
}