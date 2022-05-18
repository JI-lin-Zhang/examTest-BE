import { Service } from 'egg'
import prisma from '../../utils/db'
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
    const user = await prisma.user.findUnique({
      where: {
        phone: parseInt(phone, 10),
      },
    })
    return user
  }

  /**
   * find user by email
   * @param email - a user's email
   */
  public async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  /**
   * find user by id
   * @param id - a user's id
   */
  public async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  public async createUser(userInfo: CreateUserFace) {
    const { username, email, phone } = userInfo
    // 创建用户
    try {
      return await prisma.user.create({
        // 调用prisma的创建功能
        data: {
          username,
          email,
          phone: parseInt(phone, 10),
          password: 'test',
        },
      })
    } catch (err) {
      // 异常捕获
      console.log(err)
      return err
    }
  }

  // 返回所有用户
  async getAllUsers() {
    try {
      return await prisma.user.findMany()
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
