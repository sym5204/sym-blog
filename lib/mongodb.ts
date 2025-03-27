// 导入mongoose模块
import mongoose from 'mongoose';

// 从环境变量获取MongoDB连接URI
const MONGODB_URI = process.env.MONGODB_URI;

// 检查是否配置了MongoDB连接URI
if (!MONGODB_URI) {
  throw new Error('请在环境变量中定义MONGODB_URI');
}

// 缓存mongoose连接实例,避免重复连接
 let cached = global.mongoose ;

// 如果缓存不存在,初始化缓存对象
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 连接MongoDB数据库
 * @returns {Promise} 返回mongoose连接实例
 */
async function connectDB() {
  // 如果已经连接,直接返回连接实例
  if (cached.conn) {
    return cached.conn;
  }

  // 如果没有正在进行的连接,创建新连接
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // 禁用缓存命令
      // 使用新的URL解析器，确保正确解析MongoDB连接字符串
      useNewUrlParser: true,
      // 使用统一的拓扑结构，优化服务器发现和监控
      useUnifiedTopology: true,
    };

    // 创建连接并缓存Promise
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB连接失败:', error);
      throw new Error('数据库连接异常: ' + error.message);
    });
  }
  
  // 等待连接完成并返回连接实例
  cached.conn = await cached.promise;
  return cached.conn;
}

// 导出连接函数
export default connectDB;