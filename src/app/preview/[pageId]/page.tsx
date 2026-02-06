'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { PageMetadata } from '@/types/page';
import RenderComponent from '@/components/builder/RenderComponent';
import { useBuilderStore } from '@/store/useBuilderStore';

export default function PreviewPage() {
    const { pageId } = useParams();
    const [loading, setLoading] = useState(true);
    const { setPageData } = useBuilderStore();

    useEffect(() => {
        async function fetchPage() {
            if (!pageId) return;
            try {
                const docRef = doc(db, 'pages', pageId as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as PageMetadata;
                    setPageData(data.content);
                }
            } catch (error) {
                console.error('Error fetching page:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPage();
    }, [pageId, setPageData]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-sans">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading your page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto">
                {/* We use RenderComponent directly for preview */}
                {/* Wrapped in a simple layout if needed */}
                <div id="preview-root">
                    {/* Root components rendering logic would go here */}
                    <main>
                        <p className="p-8 text-center text-gray-400 italic">Page preview: {pageId}</p>
                        {/* The actual implementation would iterate through rootComponentIds */}
                    </main>
                </div>
            </div>
        </div>
    );
}
