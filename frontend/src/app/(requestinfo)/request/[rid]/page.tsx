import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRequest from "@/libs/getRequest";
import Link from "next/link";

export default async function RequestDetailPage(props: { params: { rid: string } }) {
    const { params } = props;
    const rid = params.rid;

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.token) return null;

    const requestDetail = await getRequest(session.user.token, rid);

    if (!requestDetail || !requestDetail.data) return null;

    const r = requestDetail.data;

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/request"
                    className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 transition"
                >
                    ← Back to Requests
                </Link>

                {/* Request Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Request Detail
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Transaction Type</p>
                            <p className="text-lg font-semibold text-gray-900">{r.transactionType}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Item Amount</p>
                            <p className="text-lg font-semibold text-gray-900">{r.itemAmount}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Transaction Date</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(r.transactionDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Product</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {r.product_id?.name ?? r.product_id?.toString()}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">User</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {r.user?.name ?? r.user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}