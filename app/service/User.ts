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

  public async deleteUserById(id: string) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      })
      return user
    } catch (err) {
      console.error(err)
      return '删除失败'
    }
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

  public async submitQuestionnaire(id: string, score: number) {
    // const user = await prisma.user.findFirst(); // 查找第一个用户
    return prisma.user.update({
      where: { id },
      data: {
        score,
      },
    })
  }

  /* Get updated score */
  public async submit(examineeId: string, score: number) {
    const res = await this.submitQuestionnaire(examineeId, score)
    const { score: examScore } = res
    return `${examScore}`
  }


  // 查询当天参加考试题的人数
  public async getTodayUser() {
    // 获取当天的时间
    const date = new Date()
    // 获取当天时间的 00:00:00:00
    date.setHours(8, 0, 0, 0)

    const todayTotal = await prisma.user.count({
      where: {
        updateAt: {
          gte: date,
        },
      },
    })
    return todayTotal
  }
}
