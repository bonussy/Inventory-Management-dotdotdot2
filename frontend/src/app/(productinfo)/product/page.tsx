// ...existing code...
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
        <main className="p-4 sm:p-6 md:p-8 lg:p-12 ">
            <div className="max-w-7xl mx-auto">
                {/* Header: centered title on every screen */}
                <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Our Product(s)</h1>
                </div>

                <div className="w-full">
                    <ProductCatalog productsJson={products} />
                </div>
            </div>
        </main>
    );

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Header: centered title with Add button positioned to the right */}
                <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Our Product(s)</h1>

                    {profile.data.role === "admin" && (
                        <Link 
                            href="/product/add" 
                            // moved to inline below on xs, positioned absolute and vertically centered on sm+
                            className="mt-4 sm:mt-0 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 
                            inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white 
                            px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-base"
                        >
                            Add Product
                        </Link>
                    )}
                    
                </div>

                <div className="w-full">
                    <ProductCatalog productsJson={products} userRole={profile.data.role} token={session.user.token}/>
                </div>
            </div>
        </main>
    );
}
// ...existing code...