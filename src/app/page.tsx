'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Layout, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="h-20 border-b border-gray-100 flex items-center justify-between px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">CreateMyWeb</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
          <Link href="/builder">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Go to Builder</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3" />
            Empowering Creativity
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900"
          >
            Build your dream website <br />
            <span className="text-blue-600">without writing code</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-xl text-gray-500 leading-relaxed"
          >
            A powerful, intuitive, and lightning-fast visual page builder that helps you
            launch professional websites in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 pt-4"
          >
            <Link href="/builder">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
                Start Building Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                View Templates
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: Zap, title: "Ultra Fast", desc: "Built on Next.js 15 for maximum performance and SEO score out of the box." },
            { icon: Layout, title: "Visual Editor", desc: "Drag and drop components with real-time preview and instant property inspection." },
            { icon: Shield, title: "Secure & Scalable", desc: "Powered by Firebase for reliable hosting, authentication, and data management." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
