import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import Category from '@/models/Category';
import { isValidObjectId } from 'mongoose';

// 获取 所有文章，筛选出 不是“岁月随笔”分类的文章，并且 文章的 isPublished 为 true 的文章

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const type = url.searchParams.get('type');

        if (type === 'categories') {
            const categories = await Category.find({ name: { $ne: '岁月随笔' } }).select('_id name');
            return NextResponse.json(categories);
        }

        const excludeCategory = await Category.findOne({ name: '岁月随笔' });
        if (!excludeCategory) {
            return NextResponse.json({ error: '未找到指定分类' }, { status: 404 });
        }

        const query: any = {
            isPublished: true,
            categories: { $nin: [excludeCategory._id] }
        };

        const categoriesParam = url.searchParams.get('categories');
        if (categoriesParam) {
            const categoryIds = categoriesParam
                .split(',')
                .filter(id => isValidObjectId(id.trim()));
      
            if (categoryIds.length > 0) {
                query.categories.$in = categoryIds;
            }
        }

        const articles = await Article.find(query)
            .select('title categories createdAt')
            .sort({ createdAt: -1 })
            .populate('categories', 'name');

        return NextResponse.json(articles);

    } catch (error) {
        console.error('API处理错误:', error);
        return NextResponse.json(
            { error: '服务器内部错误' },
            { status: 500 }
        );
    }
}