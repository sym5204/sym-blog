import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Article from '@/models/Article';
import { authMiddleware } from '@/middleware/auth';
import { isValidObjectId } from 'mongoose';

// 删除分类
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // 验证身份
  const authError = await authMiddleware(req);
  if (authError) return authError;
  
  try {
    await connectDB();
    
    if (!isValidObjectId(resolvedParams.id)) {
      return NextResponse.json({ error: '无效的分类ID' }, { status: 400 });
    }

    // 检查是否有文章使用此分类
    const articlesUsingCategory = await Article.countDocuments({ category: resolvedParams.id });
    
    if (articlesUsingCategory > 0) {
      return NextResponse.json({ 
        error: '无法删除此分类，因为有文章正在使用它。请先修改或删除相关文章。' 
      }, { status: 400 });
    }
    
    const deletedCategory = await Category.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedCategory) {
      return NextResponse.json({ error: '分类不存在' }, { status: 404 });
    }
    
    return NextResponse.json({ message: '分类已删除' });
  } catch (error) {
    console.error('删除分类错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}