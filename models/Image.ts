import mongoose, { Schema, model } from 'mongoose';

export interface ImageDocument {
  filename: string;
  path: string;
  width: number;
  height: number;
  uploadTime: Date;
}

const ImageSchema = new Schema<ImageDocument>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  uploadTime: { type: Date, default: Date.now },
});

// 导出 ImageModel 模型，如果模型已存在则使用现有模型，否则创建新模型
export default mongoose.models.Image || model<ImageDocument>('Image', ImageSchema);
