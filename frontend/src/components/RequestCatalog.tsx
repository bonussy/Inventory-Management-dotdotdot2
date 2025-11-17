'use client';
import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import deleteRequest from '@/libs/deleteRequest';
import InteractiveCard from '@/components/InteractiveCard';
import { RequestItem, RequestJson } from '../../interface';

type Props = {
    requestsJson: RequestJson;
    userRole?: string;
    token?: string | null;
};

export default function RequestCatalog({ requestsJson, userRole, token }: Props) {
    const router = useRouter();

    const [items, setItems] = useState<RequestItem[]>(
        Array.isArray(requestsJson?.data) ? requestsJson.data : []
    );
    const [count, setCount] = useState<number>(
        typeof requestsJson?.count === 'number'
            ? requestsJson.count
            : Array.isArray(requestsJson?.data)
                ? requestsJson.data.length
                : 0
    );

    const [processing, setProcessing] = useState<Record<string, boolean>>({});

    const normalizeId = useCallback((r: RequestItem): string | null => {
        return (r as any)?._id ?? (r as any)?.id ?? null;
    }, []);

    const canPerformWrite = useMemo(() => {
        return !!token && (userRole === 'staff' || userRole === 'admin');
    }, [token, userRole]);

    const isProcessing = (id: string) => !!processing[id];
    const setProcessingFor = (id: string, v: boolean) =>
        setProcessing((prev) => ({ ...prev, [id]: v }));

    const handleEdit = (requestId?: string) => {
        if (!requestId || isProcessing(requestId)) return;
        router.push(`/request/${requestId}/edit`);
    };

    const handleDelete = async (requestId?: string | null) => {
        if (!requestId) return alert('Invalid request id');
        if (!token) return alert('You must be logged in to delete a request');
        if (!canPerformWrite) return alert('You do not have permission to delete');

        if (isProcessing(requestId)) return;

        const prevItems = items;
        const prevCount = count;

        const newItems = prevItems.filter((r) => normalizeId(r) !== requestId);
        setItems(newItems);
        setCount((c) => Math.max(0, c - 1));
        setProcessingFor(requestId, true);

        try {
            const resp = await deleteRequest(String(token), requestId);

            if (resp && typeof resp === 'object') {
                const ok = (resp as any).ok ?? (resp as any).success;
                const msg = (resp as any).message ?? (resp as any).error;
                if (ok === false) throw new Error(msg || 'Delete failed');
            }

            alert('Request deleted successfully');
        } catch (err: any) {
            setItems(prevItems);
            setCount(prevCount);
            alert(err?.message || 'Failed to delete request');
        } finally {
            setProcessingFor(requestId, false);
        }
    };

    const handleButtonClick = (e: React.MouseEvent, callback?: () => void) => {
        e.preventDefault();
        e.stopPropagation();
        if (callback) callback();
    };

    return (
        <>
            <div className="text-center mb-4">
                Showing <strong>{count}</strong> request{count !== 1 ? 's' : ''}
            </div>

            <div className="flex flex-col gap-6 px-4">
                {items.map((r) => {
                    const id = normalizeId(r);
                    if (!id) return null;

                    const productLabel =
                        typeof r.product_id === 'string'
                            ? r.product_id
                            : `${r.product_id?.name ?? ''}${r.product_id?.sku ? ` (${r.product_id.sku})` : ''
                            }`;

                    const ownerLabel =
                        typeof r.user === 'string'
                            ? r.user
                            : r.user?.name ?? r.user?._id ?? 'Unknown';

                    let dateLabel = '';
                    if (r.createdAt) {
                        try {
                            dateLabel = new Date(r.createdAt).toLocaleDateString();
                        } catch {
                            dateLabel = String(r.createdAt);
                        }
                    }

                    return (
                        <Link key={id} href={`/request/${id}`} className="block">
                            <InteractiveCard>
                                {/* Gradient background area like ProductCard */}
                                <div className="relative w-full h-full bg-gradient-to-b from-amber-50 to-white rounded-2xl flex flex-col p-4 justify-between cursor-pointer">

                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {r.transactionType === 'stockIn' ? 'Stock In' : 'Stock Out'}
                                        </h3>
                                        <span className="text-xs text-gray-500">{dateLabel}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-2 text-gray-700 text-sm space-y-1">
                                        <div>
                                            <span className="font-medium">Product:</span> {productLabel}
                                        </div>
                                        <div>
                                            <span className="font-medium">Amount:</span> {r.itemAmount}
                                        </div>
                                        <div>
                                            <span className="font-medium">Owner:</span> {ownerLabel}
                                        </div>
                                    </div>

                                    {/* Bottom right buttons */}
                                    {canPerformWrite && (
                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                onClick={(e) => handleButtonClick(e, () => handleEdit(id))}
                                                disabled={isProcessing(id)}
                                                className="inline-flex items-center gap-2 px-3 py-1 
                     border-2 border-amber-900 text-amber-900 rounded-xl text-sm 
                     shadow-sm hover:bg-amber-50 transition disabled:opacity-50"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={(e) => handleButtonClick(e, () => handleDelete(id))}
                                                disabled={isProcessing(id)}
                                                className="inline-flex items-center gap-2 px-3 py-1 
                     border-2 border-red-500 text-red-500 rounded-xl text-sm 
                     shadow-sm hover:bg-red-50 transition disabled:opacity-50"
                                            >
                                                {isProcessing(id) ? 'Deleting…' : 'Delete'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </InteractiveCard>

                        </Link>
                    );
                })}
            </div>
        </>
    );
}
