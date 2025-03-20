// 导入 mongoose 库及其相关类型
import mongoose, { Schema, Document } from 'mongoose';

/**
 * 定义文章文档的接口，继承自 mongoose 的 Document 接口。
 * 描述了文章文档的结构和类型。
 */
export interface IArticle extends Document {
  // 文章标题，字符串类型
  title: string;
  // 文章内容，字符串类型
  content: string;
  // 文章描述，字符串类型
  description: string;
  // 文章关键词，字符串类型
  keywords: string;
  // 文章是否发布，布尔类型
  isPublished: boolean;
  // 文章所属分类，类型为数组，元素可以是 ObjectId 或字符串
  categories: (mongoose.Types.ObjectId | string)[];
  // 文章创建时间，日期类型
  createdAt: Date;
  // 文章更新时间，日期类型
  updatedAt: Date;
}

// 定义文章的 Schema
const ArticleSchema: Schema = new Schema(
  {
    // 文章标题，字符串类型，必填
    title: { type: String, required: true },
    // 文章的 slug，用于生成 URL，字符串类型，必填且唯一
    slug: { type: String, required: true },
    // 文章内容，字符串类型，必填
    content: { type: String, required: true },
    // 文章所属分类，数组类型，每个元素可以是 ObjectId 或字符串，必填
    categories: [{
      type: Schema.Types.ObjectId, 
      ref: 'Category',
      required: true,
      validate: {
        // 自定义验证函数，确保每个分类 ID 都是有效的 ObjectId
        validator: (value: any) => mongoose.Types.ObjectId.isValid(value),
      }
    }],
    // 文章所属标签，数组类型，每个元素为字符串，默认为空数组
    tags: {
      type: [String],
      default: []
    },
    // 文章封面图片 URL，字符串类型，可选
    coverImage: {
      type: String,
      default: null
    },
    // 文章是否发布，布尔类型，默认值为 false
    isPublished: { type: Boolean, default: false },
    // 文章发布时间，日期类型
    publishedAt: { type: Date },
    // 文章浏览量，数字类型，默认值为 0
    views: { type: Number, default: 0 },
    // 文章描述，字符串类型，默认值为空字符串
    description: { type: String, default: '' },
    // 文章关键词，字符串类型，默认值为空字符串
    keywords: { type: String, default: '' },
  },
  // 开启自动记录创建时间和更新时间
  { timestamps: true }
);

// 定义保存前的中间件，用于验证分类 ID 的有效性
ArticleSchema.pre('save', function(next) {
  // 检查分类 ID 是否为字符串且无效
  // 文章分类为数组，需要遍历每个分类 ID
  if (this.categories && Array.isArray(this.categories)) {
    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i];
      if (typeof category === 'string' && !mongoose.Types.ObjectId.isValid(category)) {
        // 输出警告信息
        console.warn(`文章 "${this.title}" 的分类 ID 无效: ${category}`);
        // 将无效的分类 ID 从数组中移除
        this.categories.splice(i, 1);
        i--; // 调整索引以正确遍历数组
      }
    }
  }
  // 继续执行保存操作
  next();
});

// 定义删除后的中间件，用于更新分类的文章数量
ArticleSchema.post('deleteOne', { document: true, query: false }, async function() {
  // 更新所有包含该文章的分类的文章数量
  await mongoose.model('Category').updateMany(
    { _id: { $in: this.categories } },
    { $inc: { articleCount: -1 } }
  );
});

// 导出 Article 模型，如果模型已存在则使用现有模型，否则创建新模型
export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);