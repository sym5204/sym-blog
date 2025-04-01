import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import Category from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        
        // 获取'岁月随笔'分类
        const lifeCategory = await Category.findOne({ name: '岁月随笔' });
        if (!lifeCategory) {
            return NextResponse.json({ error: '未找到指定分类' }, { status: 404 });
        }

        // 构建查询条件：包含'岁月随笔'分类且已发布
        const query = {
            isPublished: true,
            categories: lifeCategory._id
        };

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