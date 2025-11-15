'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

  const router = useRouter();
  const { data: session } = useSession();

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-20 pb-12 md:pb-16 lg:pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-white -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Side */}
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl blur-2xl opacity-50"></div>
              <Image
                src="/img/banner.png" 
                alt="Inventory Management"
                width={800}
                height={800}
                className="relative rounded-2xl shadow-lg object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Text Content Side */}
          <div className="order-1 md:order-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2">
                Inventory Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">System</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Efficiently manage your inventory with our comprehensive tracking and management solution. Real-time updates, detailed analytics, and seamless integration.
            </p>

            {/* Stats (Optional) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-xl sm:text-2xl font-bold text-amber-700">100%</p>
                <p className="text-xs sm:text-sm text-gray-600">Accurate</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-xl sm:text-2xl font-bold text-amber-700">24/7</p>
                <p className="text-xs sm:text-sm text-gray-600">Available</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-xl sm:text-2xl font-bold text-amber-700">Fast</p>
                <p className="text-xs sm:text-sm text-gray-600">Reliable</p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); router.push('/product'); }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-[1.02] active:scale-[0.98]"
              >
                View Inventory
              </button>
            </div>

            {/* User Welcome */}
            {session && (
              <p className="text-sm sm:text-base text-gray-600 pt-2">
                Welcome back, <span className="font-semibold text-amber-700">{session.user?.name}</span>! 👋
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}