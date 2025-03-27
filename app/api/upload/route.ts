import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import Image from '@/models/Image';
import sharp from 'sharp';

// POST 上传图片
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
};

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get('file') as File;

  if (!file || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: '仅支持图片文件' }, { status: 400 });
  }

  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = `/uploads/${fileName}`;
 
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const tempPath = path.join(uploadDir, fileName);
  fs.writeFileSync(tempPath, buffer);

  const metadata = await sharp(tempPath).metadata();
  const image = await Image.create({
    filename: file.name,
    path: filePath,
    uploadTime: new Date(),
    width: metadata.width,
    height: metadata.height
  });

  return NextResponse.json({ success: true, path: image.path });
};



