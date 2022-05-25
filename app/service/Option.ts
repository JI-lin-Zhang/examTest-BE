import { Service } from 'egg'
import prisma from '../../utils/db'
export interface CreateQuestionFace {
  text: string;
  questionId: string;
}

/**
 * Test Service
 */
export default class Option extends Service {

  /**
   * find option by id
   * @param id - a question's id
   */
  public async findById(id: string) {
    return prisma.option.findUnique({
      where: {
        id,
      },
    })
  }

  public async deleteById(id: string) {
    try {
      const res = await prisma.option.delete({
        where: {
          id,
        },
      })
      return res
    } catch (err) {
      console.error(err)
      return '删除失败'
    }
  }

  public async create(option: CreateQuestionFace) {
    const { text, questionId } = option
    try {
      return await prisma.option.create({
        data: {
          text,
          questionId,
        },
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getAll() {
    try {
      return await prisma.option.findMany()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  public async updateText(id: string, text: string) {
    // const user = await prisma.user.findFirst(); // 查找第一个用户
    return prisma.option.update({
      where: { id },
      data: {
        text,
      },
    })
  }
}
