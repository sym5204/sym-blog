import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { authMiddleware } from '@/middleware/auth';

// 获取所有分类
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('获取分类错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新分类
export async function PUT(req: NextRequest) {
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const data = await req.json();

    // 名称唯一性校验（排除自身）
    const existing = await Category.findOne({ 
      name: data.name,
      _id: { $ne: id }
    });
    if (existing) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }

    // 更新slug
    data.slug = data.name.toLowerCase().replace(/\s+/g, '-');

    const updated = await Category.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('更新分类错误:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 创建新分类
export async function POST(req: NextRequest) {
  const authError = await authMiddleware(req);
  if (authError) return authError;
  
  try {
    await connectDB();
    const data = await req.json();
    
    // 生成 slug
    data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    const newCategory = new Category(data);
    await newCategory.save();
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error('创建分类错误:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}