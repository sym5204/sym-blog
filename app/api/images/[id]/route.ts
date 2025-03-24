
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';
import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

// 删除图片
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }){
  await connectDB();
  const resolvedParams = await params;
  if (!resolvedParams.id) return NextResponse.json({ error: 'ID缺失' }, { status: 400 });

  const image = await Image.findByIdAndDelete(resolvedParams.id);
  if (!image) return NextResponse.json({ error: '图片不存在' }, { status: 404 });

  await unlink(`public${image.path}`);
  return NextResponse.json({ success: true });
};