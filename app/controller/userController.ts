export interface CreateUserFace {
  username: string
  email: string;
  phone: string;
}

// 引入数据库的连接服务
export async function createUser(userInfo: CreateUserFace) {
  const { username, email, phone } = userInfo;
  const prisma = require("../../utils/db");
  // 创建用户
  try {
    await prisma.user.create({
      // 调用prisma的创建功能
      data: {
        username: username,
        email,
        phone: parseInt(phone, 10),
        password: 'test',
      },
    });
  } catch (err) {
    // 异常捕获
    console.log(err);
    return err;
  }
}

// 返回所有用户
export async function getAllUsers() {
  const prisma = require("../../utils/db");
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.log(err);
    return err;
  }
}