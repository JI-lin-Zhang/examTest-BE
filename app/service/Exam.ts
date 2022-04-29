import { Service } from 'egg';
import { basePort } from '../../constants/common';
//import { baseURL } from '../../constants/common';
import { ip } from '../../utils/ip';
import { createExam, submitQuestionnaire } from '../controller/examController';

/**
 * Test Service
 */
export default class Exam extends Service {

  /* Generate an invite link */
  public async generateInviteLink(examineeId: string) {
    const res = await createExam(examineeId);
    const { id } = res;
    return `http://${ip}:${basePort}/test?inviteId=${id}`;
  }

  /* Get updated score */
  public async submit(examineeId: string, score: number) {
    const res = await submitQuestionnaire(examineeId, score);
    const { score: examScore } = res;
    return `${examScore}`;
  }

  /**
   * find exam by phone
   * @param phone - an examinee's phone of an exam
   */
  public async findExamByPhone(phone: string) {
    const prisma = require("../../utils/db");
    const exam = await prisma.exam.findUnique({
      where: {
        phone: parseInt(phone, 10),
      },
    });
    return exam;
  }

  /**
   * find exam by email
   * @param email - an examinee's email of an exam
   */
  public async findExamByEmail(email: string) {
    const prisma = require("../../utils/db");
    const exam = await prisma.exam.findUnique({
      where: {
        email,
      },
    });
    return exam;
  }

  /**
   * find exam by id
   * @param id - an exam's id
   */
  public async findExamById(id: string) {
    const prisma = require("../../utils/db");
    const exam = await prisma.exam.findUnique({
      where: {
        id,
      },
    });
    return exam;
  }

  /**
   * find exam by examineeId
   * @param examineeId - an exam's examineeId
   */
  public async findExamByExamineeId(examineeId: string) {
    const prisma = require("../../utils/db");
    const exam = await prisma.exam.findUnique({
      where: {
        examineeId,
      },
    });
    return exam;
  }
}
