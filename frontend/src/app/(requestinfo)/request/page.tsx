import getRequests from '@/libs/getRequests';
import RequestCatalog from '@/components/RequestCatalog';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import Link from 'next/link';
import React from 'react';

export default async function RequestPage() {
    // obtain the server session first
    const session = await getServerSession(authOptions);

    // not authenticated: show signin prompt (keeps your original intent)
    if (!session || !session.user?.token) {
        return (
            <main className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Your Request(s)</h1>
                    </div>

                    <p className="text-center text-gray-500">Please log in to view your requests.</p>
                </div>
            </main>
        );
    }

    // if authenticated, fetch profile & requests with robust error handling
    let profile;
    try {
        profile = await getUserProfile(session.user.token);
        // defensive shape check
        if (!profile || !profile.data) {
            throw new Error('Unable to load profile');
        }
    } catch (err: any) {
        // If profile load fails, treat as unauthenticated for safety and prompt login again
        console.error('getUserProfile error', err);
        return (
            <main className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Your Request(s)</h1>
                    </div>
                    <p className="text-center text-gray-500">Failed to load profile. Please sign in again.</p>
                </div>
            </main>
        );
    }

    // fetch requests — keep token-first call signature as your existing getRequests expects
    let requests;
    try {
        requests = await getRequests(session.user.token);
        if (!requests || !Array.isArray(requests.data)) {
            // If the API returns a different shape, normalize to an empty list but log for debugging
            console.warn('getRequests returned unexpected shape', requests);
            requests = { data: [], count: 0 };
        } else {
            // ensure count exists
            if (typeof requests.count !== 'number') {
                requests.count = requests.data.length;
            }
        }
    } catch (err: any) {
        console.error('getRequests error', err);
        // show a friendly fallback UI
        return (
            <main className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Your Request(s)</h1>
                    </div>

                    <p className="text-center text-gray-500">Failed to load requests. Try again later.</p>
                </div>
            </main>
        );
    }

    // Render the main page with header and Add button for staff (same theme as product page)
    return (
        <main className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header: centered title with Add button positioned to the right */}
                <div className="relative flex items-center justify-center mb-6 min-h-[48px]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Your Request(s)</h1>

                    {profile.data.role === 'staff' && (
                        <Link
                            href="/request/add"
                            className="mt-4 sm:mt-0 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-base"
                        >
                            New Request
                        </Link>
                    )}
                </div>

                <div className="w-full">
                    <RequestCatalog requestsJson={requests} userRole={profile.data.role} token={session.user.token} />
                </div>
            </div>
        </main>
    );
}
