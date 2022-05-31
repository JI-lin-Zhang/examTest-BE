import { Service } from 'egg'
import { questionFace } from '../../constants/interfaces'
import prisma from '../../utils/db'
export interface CreateQuestionFace {
  title: string
  answer: number
  tag?: string
  choices?: string[]
}

/**
 * Test Service
 */
export default class Question extends Service {

  /**
   * find question by id
   * @param id - a question's id
   */
  public async findQuestionById(id: string, include?: string) {
    return prisma.question.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        choices: true,
        tag: true,
        answer: include === 'answer',
      },
    })
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
    const { title, answer, tag, choices } = question
    // const choicesStr = choices ? JSON.stringify(choices) : ''
    try {
      return await prisma.question.create({
        data: {
          title,
          answer,
          tag: tag ?? '',
          choices,
        },
      })
    } catch (err) {
      // 异常捕获
      console.log(err)
      return err
    }
  }

  // 返回所有问题
  async getAllQuestions(tag?: string, include?: string) {
    if (tag) {
      return this.getQuestionsByTag(tag)
    }
    try {
      return prisma.question.findMany({
        select: {
          id: true,
          title: true,
          choices: true,
          tag: true,
          answer: include === 'answer',
        },
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // 根据标签返回问题
  async getQuestionsByTag(tag: string, include?: string) {
    try {
      return await prisma.question.findMany({
        where: {
          tag,
        },
        select: {
          id: true,
          title: true,
          choices: true,
          tag: true,
          answer: include === 'answer',
        },
      })
    } catch (err: any) {
      console.log(err)
      return err
    }
  }

  public async update(id: string, data: questionFace) {
    try {
      return await prisma.question.update({
        where: {
          id,
        },
        data,
      })
    } catch (err: any) {
      return { err: err.meta.cause }
    }
  }
}
