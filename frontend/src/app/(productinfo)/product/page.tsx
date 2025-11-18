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
        <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header: centered title on every screen */}
                <div className="relative flex items-center justify-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
                        Our Product<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">(s)</span>
                    </h1>
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
        <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Header: centered title with Add button positioned to the right */}
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-12">
                    {/* Title - centered on mobile, left-aligned on sm+ */}
                    <div className="w-full sm:flex-1 text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Our Product<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">(s)</span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-2 hidden sm:block">Manage your inventory efficiently</p>
                    </div>

                    {/* Add Product Button */}
                    {profile.data.role === "admin" && (
                        <Link 
                            href="/product/add" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-6 py-3 sm:py-2.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Product
                        </Link>
                    )}
                </div>

                {/* Products Grid */}
                <div className="w-full">
                    <ProductCatalog productsJson={products} userRole={profile.data.role} token={session.user.token}/>
                </div>
            </div>
        </main>
    );
}