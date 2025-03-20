'use client'

// 单独创建一个文章分类管理页面

import CategoryManager from '@/components/CategoryManager'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Category {
    _id: string;
    name: string;
    description: string;
}

const LoginPage = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // 从localStorage检查令牌
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
        }
    }, []);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token } = response.data;

            localStorage.setItem('authToken', token);
            setToken(token);
            setIsLoggedIn(true);
            router.push('/admin')
        } catch (error: any) {
            setError(error.response?.data?.error || '登录失败');
        }
    };

    return (
        <div className="p-6 mx-auto mt-10 max-w-md bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-2xl font-bold text-center">管理员登录</h1>
            {error && <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">用户名</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-3 py-2 w-full rounded-md border border-gray-300"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700">密码</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-2 w-full rounded-md border border-gray-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    登录
                </button>
            </form>
        </div>
    );


}

export default LoginPage
