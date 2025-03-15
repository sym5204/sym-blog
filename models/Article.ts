import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  description: string;
  keywords: string;
  published: boolean;
  category: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    published: { type: Boolean, default: false },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category',
      required: false
    },
  },
  { timestamps: true }
);

ArticleSchema.pre('save', function(next) {
  if (this.category && typeof this.category === 'string' && !mongoose.isValidObjectId(this.category)) {
    console.warn(`文章 "${this.title}" 的分类 ID 无效: ${this.category}`);
    this.category = null;
  }
  next();
});

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema); 