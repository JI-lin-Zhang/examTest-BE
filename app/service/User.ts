import { Service } from 'egg'
import { pageSize } from '../../constants/interfaces'
import prisma from '../../utils/db'
import _ from 'lodash'

export interface CreateUserFace {
  username: string
  email: string
  phone: string
}
export interface FindUserFace {
  username: { contains: string}
  email: string
  phone: string
  tag: string
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
        phone,
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
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        address: true,
        score: true,
        updateAt: true,
        gender: true,
        createAt: true,
        exams: true,
      },
    })
    return user
  }

  public async findUser(query: Partial<FindUserFace & pageSize>) {
    const size = query.size ?? 10
    let page = query.page ?? 1
    const where = Object.assign({}, { ..._.omit(query, ['size', 'page', 'tag']) }, !query.tag ? {} : { exams: { some: { tag: { contains: query.tag ?? '' }} } })
    const totalCount = await prisma.user.count({
      where,
    })
    if(page < 1) page = 1
    const list = await prisma.user.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        address: true,
        score: true,
        updateAt: true,
        gender: true,
        createAt: true,
        exams: !query.tag ? true : { where: { tag: query.tag! } },
      },
    })
    return { list, totalCount }
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
          phone,
        },
      })
    } catch (err) {
      // 异常捕获
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
    date.setHours(0, 0, 0, 0)

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
    return await prisma.$queryRawUnsafe(`
      select b.day, count(a.day) as num from (
        -- 得到7天内有数据的日期列表
        select to_char(to_timestamp(extract(epoch from create_at)), 'YYYY-MM-DD') as day
        from exams where create_at > date_trunc('day', now() - interval '6 days')
      ) as a right join (
        -- 生成7天内的完整日期列表
        select to_char(ts, 'YYYY-MM-DD') as day
        from generate_series(now() - interval '6 days', now(), '1 day') as ts
      ) as b on a.day=b.day group by b.day order by b.day
    `)
  }
}
