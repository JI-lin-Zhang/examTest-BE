import { Service } from 'egg';
export interface CreateUserFace {
  username: string
  email: string;
  phone: string;
}

/**
 * Test Service
 */
export default class User extends Service {

  /**
   * find user by phone
   * @param phone - a user's phone number
   */
  public async findUserByPhone(phone: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        phone: parseInt(phone, 10),
      },
    });
    return user;
  }

  /**
   * find user by email
   * @param email - a user's email
   */
  public async findUserByEmail(email: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  /**
   * find user by id
   * @param id - a user's id
   */
  public async findUserById(id: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  public async createUser(userInfo: CreateUserFace) {
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
  async getAllUsers() {
    const prisma = require("../../utils/db");
    try {
      return await prisma.user.findMany();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
