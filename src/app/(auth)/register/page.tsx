'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // Clear error when user types
        if (error) setError(null);
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) return "Full name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address";
        if (!formData.password) return "Password is required";
        if (formData.password.length < 8) return "Password must be at least 8 characters";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            // Update profile with full name
            await updateProfile(userCredential.user, {
                displayName: formData.fullName
            });

            // Redirect to builder or home
            router.push('/builder');
        } catch (err: any) {
            console.error('Registration error:', err);
            let message = "Failed to create account. Please try again.";

            if (err.code === 'auth/email-already-in-use') {
                message = "This email is already registered. Please sign in instead.";
            } else if (err.code === 'auth/invalid-email') {
                message = "Invalid email address.";
            } else if (err.code === 'auth/weak-password') {
                message = "Password should be at least 6 characters."; // Firebase message, usually we catch 8 chars before this
            }

            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

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

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center gap-2"
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                            <Input
                                name="fullName"
                                type="text"
                                placeholder="your full name"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Email address</label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters</p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
