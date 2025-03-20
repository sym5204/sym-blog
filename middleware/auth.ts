// 导入 Next.js 的请求和响应对象
import { NextRequest, NextResponse } from 'next/server';
// 导入自定义的 JWT 验证函数
import { verifyToken } from '@/lib/jwt';

/**
 * 身份验证中间件，用于保护后台路由和验证请求中的 JWT 令牌。
 * 
 * @param req - Next.js 请求对象，包含请求的详细信息。
 * @returns 如果验证失败，返回重定向响应或错误响应；如果验证通过，返回 null。
 */
export async function authMiddleware(req: NextRequest) {
  // 后台路由保护：如果请求的路径是后台路由且没有 auth_token 饼干，则重定向到登录页面
  if (req.nextUrl.pathname.startsWith('/admin') && !req.cookies.get('auth_token')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // 从请求头中获取 Authorization 字段，并去除 'Bearer ' 前缀
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  
  // 如果没有提供令牌，则返回未授权错误响应
  if (!token) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }
  
  // 验证令牌并获取解码后的数据
  const decoded = verifyToken(token);
  // 如果令牌无效，则返回无效令牌错误响应
  if (!decoded) {
    return NextResponse.json({ error: '无效的令牌' }, { status: 401 });
  }
  
  // 认证通过，返回 null
  return null; 
}