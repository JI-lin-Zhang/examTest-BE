import { Service } from 'egg'
import prisma from '../../utils/db'
export interface CreateQuestionFace {
  title: string;
  answer: number;
}

/**
 * Test Service
 */
export default class Question extends Service {

  /**
   * find question by id
   * @param id - a question's id
   */
  public async findQuestionById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  public async deleteQuestionById(id: string) {
    try {
      const user = await prisma.question.delete({
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

  public async createQuestion(question: CreateQuestionFace) {
    const { title, answer } = question
    // 创建用户
    try {
      return await prisma.question.create({
        // 调用prisma的创建功能
        data: {
          title,
          answer,
        },
      })
    } catch (err) {
      // 异常捕获
      console.log(err)
      return err
    }
  }

  // 返回所有问题
  async getAllQuestions(tag?: string) {
    if (tag) {
      return this.getQuestionsByTag(tag)
    }
    try {
      return prisma.question.findMany({
        include: {
          options: true,
        },
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // 根据标签返回问题
  async getQuestionsByTag(tag: string) {
    try {
      return await prisma.question.findMany({
        where: {
          tag,
        },
        include: {
          options: true,
        },
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  public async updateAnswer(id: string, answer: number) {
    // const user = await prisma.user.findFirst(); // 查找第一个用户
    return prisma.question.update({
      where: { id },
      data: {
        answer,
      },
    })
  }
}
