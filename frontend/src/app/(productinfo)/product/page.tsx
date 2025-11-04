import getProducts from "@/libs/getProducts";
import ProductCatalog from "@/components/ProductCatalog";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import Link from 'next/link';

export default async function Product() {

    const products = await getProducts();

    const session = await getServerSession(authOptions);
    if(!session || !session.user?.token)  return (
        <main className="text-center p-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-medium text-center">Our Product(s)</h1>
            </div>
            <ProductCatalog productsJson={products} />
        </main>
    );

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="text-center p-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-medium text-center">Our Product(s)</h1>
                {profile.data.role === "admin" && (
                    <Link 
                        href="/product/add" 
                        className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Add Product
                    </Link>
                )}
            </div>

            <ProductCatalog productsJson={products} userRole={profile.data.role} token={session.user.token}/>
        </main>
    );
}