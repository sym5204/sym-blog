'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';

interface Category {
    _id: string;
    name: string;
    description: string;
}

interface CategoryManagerProps {
    categories: Category[];
    onCategoryChange: (categories: Category[]) => void;
    token: string;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onCategoryChange, token }) => {
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/categories', newCategory, {
                headers: { Authorization: `Bearer ${token}` }
            });

            onCategoryChange([...categories, response.data]);
            setNewCategory({ name: '', description: '' });
        } catch (error: any) {
            setError(error.response?.data?.error || '添加分类失败');
        }
    };

    const openDeleteDialog = (categoryId: string) => {
        setCategoryToDelete(categoryId);
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;
        
        setError('');
        setIsDeleting(true);

        try {
            await axios.delete(`/api/categories/${categoryToDelete}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // 更新分类列表
            const updatedCategories = categories.filter(cat => cat._id !== categoryToDelete);
            onCategoryChange(updatedCategories);
        } catch (error: any) {
            setError(error.response?.data?.error || '删除分类失败');
        } finally {
            setIsDeleting(false);
            setDialogOpen(false);
            setCategoryToDelete('');
        }
    };

    return (
        <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">分类管理</h3>

            {error && <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="分类名称"
                        className="flex-1 px-3 py-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="分类描述（可选）"
                        className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        添加分类
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                    <div key={category._id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                            <div className="font-medium">{category.name}</div>
                            {category.description && (
                                <div className="text-sm text-gray-600">{category.description}</div>
                            )}
                        </div>

                        <div className="opacity-80">
                            <button
                                onClick={() => openDeleteDialog(category._id)}
                                disabled={isDeleting}
                                className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>删除分类</AlertDialogTitle>
                        <AlertDialogDescription>
                            如果这个分类有文章使用，将无法删除。确定要删除这个分类吗？
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            确定
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default CategoryManager; 