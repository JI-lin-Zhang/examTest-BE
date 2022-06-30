import { Prisma, PrismaClient } from '@prisma/client'

// 引入 prismaClient
const db = new PrismaClient()

db.$use(async (params, next) => {
  if (params.model === 'user') {
    enum actionType {
      delete = 'update',
      deleteMany = 'updateMany',
    }
    switch (params.action) {
      case 'delete':
      case 'deleteMany':
        params.action = actionType[params.action] as Prisma.PrismaAction
        params.args.data = {
          deletedAt: new Date(),
          deleted: true,
        }
        break
      case 'count':
      case 'findMany':
      case 'findFirst':
        params.args.where ??= {}
        params.args.where.deleted = false
        break
      default:
    }
  }
  return next(params)
})

db.$connect().catch(err => console.error(err))
// 进行数据库的连接

export default db
