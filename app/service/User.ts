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

  // 查询最近7天的参加考试的人数
  public async lastSevenDay() {
    // 查询出最近7天的用户数据,按day分组汇总
    const dateArr: any[] = await prisma.$queryRawUnsafe(`
     select day,count(1) as num from (
         select date(update_at/1000, 'unixepoch', '+8 hours') as day from users
        where day>date('now','+8 hours','-7 days')
      ) a group by day
    `)

    // 创建空对象
    const newObj = {}

    dateArr.forEach(item => {
      // 设置newObj的键值对
      newObj[item.day] = item.num
    })

    const newArr: any[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - 7 + i)
      date.setHours(8)
      const day = date.toJSON().slice(0, 10)
      const obj = {
        day,
        // 如果没有数据,就用0填充, 空值合并操作符
        num: newObj[day] ?? 0,
      }
      newArr.push(obj)
    }
    return newArr
  }
}
