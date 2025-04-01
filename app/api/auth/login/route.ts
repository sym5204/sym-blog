import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    
    // 硬编码检查用户名和密码，我这里是为了方便操作，因为这个个人网站也只有我一个人打理，所以使用了硬编码，安全起见还是建议使用数据库存储用户信息，并且使用加密算法存储密码
    if (username === '用户名' && password === '密码') {
      // 查找或创建用户
      let user = await User.findOne({ username });
      
      if (!user) {
        user = new User({ username, password });
        await user.save();
      } else {
        // 验证密码
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return NextResponse.json({ error: '密码错误' }, { status: 401 });
        }
      }
      
      // 生成JWT令牌
      const token = signToken({ id: user._id, username: user.username });
      
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
} 