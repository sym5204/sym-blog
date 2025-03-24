import connectDB from "@/lib/mongodb";
import Image from '@/models/Image';
import { NextResponse } from "next/server";

// GET 获取图片列表
export const GET = async () => {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json(images);
};