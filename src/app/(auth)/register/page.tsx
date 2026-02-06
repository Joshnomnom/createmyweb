'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Create account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                            <Input type="text" placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Email address</label>
                            <Input type="email" placeholder="you@example.com" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                            <Input type="password" placeholder="••••••••" required />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 focus:ring-green-500">
                        Register
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
