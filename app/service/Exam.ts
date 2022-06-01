import { Service } from 'egg'
import { basePort } from '../../constants/common'
// import { baseURL } from '../../constants/common';
import { ip } from '../../utils/ip'
import prisma from '../../utils/db'
import { answerFace } from '../../constants/interfaces'

/**
 * Test Service
 */
export default class Exam extends Service {
  public async createExam(examineeId: string, tag?: string) {
    // const user = await prisma.user.findFirst(); // 查找第一个用户
    return prisma.exam.create({
    // 调用创建文章内容的方法
      data: {
        examineeId,
        tag: tag ?? 'frontend',
        // examineeId: user.id,
        // 填写进去相应的数据
      },
    })
  }
  /* Generate an invite link */
  public async generateInviteLink(examineeId: string) {
    const res = await this.createExam(examineeId)
    const { id } = res
    return `http://${ip}:${basePort}/test?inviteId=${id}`
  }

  public async submitQuestionnaire(id: string, score: number) {
    // const user = await prisma.user.findFirst(); // 查找第一个用户
    return prisma.exam.update({
      where: { id },
      data: {
        score,
      },
    })
  }

  /**
   * find exam by phone
   * @param phone - an examinee's phone of an exam
   */
  public async findExamByPhone(phone: string) {
    const exam = await prisma.exam.findMany({
      where: {
        phone,
      },
    })
    return exam
  }

  /**
   * find exam by email
   * @param email - an examinee's email of an exam
   */
  public async findExamByEmail(email: string) {
    const exam = await prisma.exam.findMany({
      where: {
        email,
      },
    })
    return exam
  }

  /**
   * find exam by id
   * @param id - an exam's id
   */
  public async findExamById(id: string) {
    const exam = await prisma.exam.findUnique({
      where: {
        id,
      },
    })
    return exam
  }

  /**
   * find exam by tag
   * @param tag - an exam's tag
   */
  public async findExamByTag(tag: string) {
    const exams = await prisma.exam.findMany({
      where: {
        tag,
      },
    })
    return exams
  }

  /**
   * find exam by examineeId
   * @param examineeId - an exam's examineeId
   */
  public async findExamByExamineeId(examineeId: string) {
    const exam = await prisma.exam.findMany({
      where: {
        examineeId,
      },
    })
    return exam
  }

  /**
   * delete exam by id
   * @param id - an exam's id
   */
  public async deleteExamById(id: string) {
    const exam = await prisma.exam.delete({
      where: {
        id,
      },
    })
    return exam
  }

  // 返回所有测试
  public async getAllExams() {
    try {
      return prisma.exam.findMany()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // 提交 exam
  public async submit(tag: string, answers: answerFace[], userid: string) {
    if (!answers) return { err: '答案不能为空' }
    const questions = await prisma.question.findMany({
      where: {
        tag,
      },
      select: {
        id: true,
        answer: true,
      },
    })
    const exams = questions.map(question => ({
      questionId: question.id,
      answer: question.answer,
      received: answers.find(answer => answer.questionId === question.id)?.answer,
    }))
    const score = Math.round(exams.filter(item => item.received === item.answer).length * 100 / (questions.length || 1))
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    })
    if (!user) return { err: '用户不存在' }
    await prisma.exam.create({
      data: {
        examineeId: user.id,
        email: user.email,
        phone: user.phone,
        score,
        choosedChoices: JSON.stringify(exams),
        tag,
      },
    })

    return { score, exam: exams }
  }
}
