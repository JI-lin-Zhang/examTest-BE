export async function createExam(examineeId: string){
  const prisma = require("../../utils/db");
  // const user = await prisma.user.findFirst(); // 查找第一个用户
  return prisma.exam.create({
  // 调用创建文章内容的方法  
    data: {
      examineeId,
      //examineeId: user.id,
      //填写进去相应的数据
    }
  });
}

export async function submitQuestionnaire(examineeId: string, score: number){
  const prisma = require("../../utils/db");
  // const user = await prisma.user.findFirst(); // 查找第一个用户
  return prisma.exam.update({
    where: { examineeId},
    data: {
      score,
    }
  });
}
