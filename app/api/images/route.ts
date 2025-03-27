import connectDB from "@/lib/mongodb";
import Image from '@/models/Image';
import { NextResponse } from "next/server";

// GET 获取图片列表
export const GET = async () => {
  try {
    await connectDB();
    const images = await Image.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error('获取图片列表失败:', error);
    return NextResponse.json(
      { error: '内部服务器错误' },
      { status: 500 }
    );
  }
};