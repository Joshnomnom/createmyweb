'use client';

import React from 'react';
import Sidebar from '@/components/builder/Sidebar';
import Canvas from '@/components/builder/Canvas';
import Inspector from '@/components/builder/Inspector';
import { Button } from '@/components/ui/Button';
import { Save, Eye, Layout as LayoutIcon, Share2 } from 'lucide-react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { motion } from 'framer-motion';

export default function BuilderPage() {
    const { pageData } = useBuilderStore();

    const handleSave = () => {
        console.log('Saving page data:', pageData);
        // Implementation for save would go here
        alert('Page state logged to console (Firebase integration pending)');
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans">
            {/* Header */}
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shadow-sm"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <LayoutIcon className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="font-bold text-xl tracking-tight text-gray-900">
                        CreateMyWeb <span className="text-gray-400 font-normal">| {pageData.title}</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(`/preview/${pageData.id}`, '_blank')}>
                        <Eye className="w-4 h-4" />
                        Preview
                    </Button>
                    <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                </div>
            </motion.header>

            {/* Main Builder Area */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <Canvas />
                <Inspector />
            </div>

            {/* Footer / Status Bar */}
            <footer className="h-8 bg-white border-t border-gray-200 px-4 flex items-center justify-between text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                <div className="flex items-center gap-4">
                    <span>Status: <span className="text-green-500 font-bold">Ready</span></span>
                    <span>Components: {Object.keys(pageData.components).length}</span>
                </div>
                <div>
                    Last saved: Just now
                </div>
            </footer>
        </div>
    );
}
