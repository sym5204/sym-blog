// 导入mongoose库及其相关类型
import mongoose, { Schema, Document } from 'mongoose';

/**
 * 定义ICategory接口，继承自mongoose的Document接口
 * 该接口描述了Category文档的结构
 */
export interface ICategory extends Document {
  // 分类名称，字符串类型
  name: string;
  // 分类的slug，用于URL，字符串类型
  slug: string;
  // 分类描述，字符串类型，可选
  description?: string;
  // 创建时间，日期类型
  createdAt: Date;
  // 更新时间，日期类型
  updatedAt: Date;
}

// 定义CategorySchema，用于描述Category文档的结构和验证规则
const CategorySchema: Schema = new Schema(
  {
    // 分类名称，字符串类型，必填且唯一
    name: { type: String, required: true, unique: true },
    // 分类的slug，字符串类型，必填、唯一且建立索引
    slug: { type: String, required: true, unique: true, index: true },
    // 文章数量，数字类型，默认值为0
    articleCount: { type: Number, default: 0 },
    // 分类描述，字符串类型，默认值为空字符串
    description: { type: String, default: '' },
  },
  // 启用时间戳，自动添加createdAt和updatedAt字段
  { timestamps: true }
);

// 为slug字段添加唯一索引
CategorySchema.index({ slug: 1 }, { unique: true });

// 导出Category模型，如果模型已存在则使用现有模型，否则创建新模型
export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);