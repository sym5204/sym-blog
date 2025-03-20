// 引入 Next.js 的请求和响应对象
import { NextRequest, NextResponse } from 'next/server';
// 引入连接 MongoDB 数据库的函数
import connectDB from '@/lib/mongodb';
// 引入 Category 模型
import Category from '@/models/Category';
// 引入身份验证中间件
import { authMiddleware } from '@/middleware/auth';

/**
 * 获取所有分类的 API 端点
 * @param req - NextRequest 对象
 * @returns 包含所有分类的 JSON 响应或错误响应
 */
// 获取所有分类
export async function GET(req: NextRequest) {
  try {
    // 连接到数据库
    await connectDB();
    // 查询所有分类，并按名称升序排序
    const categories = await Category.find().sort({ name: 1 });
    // 返回包含分类的 JSON 响应
    return NextResponse.json(categories);
  } catch (error) {
    // 打印错误信息
    console.error('获取分类错误:', error);
    // 返回服务器错误的 JSON 响应
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

/**
 * 更新分类的 API 端点
 * @param req - NextRequest 对象
 * @returns 更新后的分类的 JSON 响应或错误响应
 */
// 更新分类
export async function PUT(req: NextRequest) {
  // 执行身份验证中间件
  const authError = await authMiddleware(req);
  // 如果身份验证失败，返回错误响应
  if (authError) return authError;

  try {
    // 连接到数据库
    await connectDB();
    // 从请求 URL 中提取查询参数
    const { searchParams } = new URL(req.url);
    // 获取分类的 ID
    const id = searchParams.get('id');
    // 解析请求体中的 JSON 数据
    const data = await req.json();

    // 名称唯一性校验（排除自身）
    const existing = await Category.findOne({ 
      name: data.name,
      _id: { $ne: id }
    });
    // 如果分类名称已存在，返回错误响应
    if (existing) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }

    // 更新slug，将名称转换为小写并将空格替换为连字符
    data.slug = data.name.toLowerCase().replace(/\s+/g, '-');

    // 根据 ID 更新分类，并返回更新后的分类
    const updated = await Category.findByIdAndUpdate(id, data, { new: true });
    // 返回更新后的分类的 JSON 响应
    return NextResponse.json(updated);
  } catch (error: any) {
    // 打印错误信息
    console.error('更新分类错误:', error);
    // 如果是唯一键冲突错误，返回分类名称已存在的错误响应
    if (error.code === 11000) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }
    // 返回服务器错误的 JSON 响应
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

/**
 * 创建新分类的 API 端点
 * @param req - NextRequest 对象
 * @returns 新创建的分类的 JSON 响应或错误响应
 */
// 创建新分类
export async function POST(req: NextRequest) {
  // 执行身份验证中间件
  const authError = await authMiddleware(req);
  // 如果身份验证失败，返回错误响应
  if (authError) return authError;
  
  try {
    // 连接到数据库
    await connectDB();
    // 解析请求体中的 JSON 数据
    const data = await req.json();
    
    // 生成 slug，将名称转换为小写并将空格替换为连字符
    data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    // 创建新的分类实例
    const newCategory = new Category(data);
    // 保存新分类到数据库
    await newCategory.save();
    
    // 返回新创建的分类的 JSON 响应，状态码为 201
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    // 打印错误信息
    console.error('创建分类错误:', error);
    // 如果是唯一键冲突错误，返回分类名称已存在的错误响应
    if (error.code === 11000) {
      return NextResponse.json({ error: '分类名称已存在' }, { status: 400 });
    }
    // 返回服务器错误的 JSON 响应
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}