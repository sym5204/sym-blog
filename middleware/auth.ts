import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function authMiddleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
  }
  
  return null; // 认证通过
} 