// 引入 jsonwebtoken 库，用于生成和验证 JWT
import jwt from 'jsonwebtoken';

/**
 * JWT 密钥，从环境变量中获取。
 * 如果环境变量中未设置 JWT_SECRET，则使用默认的备用密钥（不用于生产环境）。
 */
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_not_for_production';

/**
 * 生成 JWT 令牌。
 * 
 * @param payload - 要包含在 JWT 中的数据负载。
 * @returns 生成的 JWT 令牌。
 */
export function signToken(payload: any): string {
  // 使用 jsonwebtoken 的 sign 方法生成 JWT 令牌，设置过期时间为 1 天
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

/**
 * 验证 JWT 令牌。
 * 
 * @param token - 要验证的 JWT 令牌。
 * @returns 如果验证成功，返回解码后的令牌数据；如果验证失败，返回 null。
 */
export function verifyToken(token: string): any {
  try {
    // 使用 jsonwebtoken 的 verify 方法验证 JWT 令牌
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // 如果验证过程中出现错误，返回 null
    return null;
  }
}
