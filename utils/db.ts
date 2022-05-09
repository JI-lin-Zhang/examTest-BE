const { PrismaClient } = require('@prisma/client');

 // 引入 prismaClient 
const db = new PrismaClient();
 
db.$connect().catch((err) => console.error(err));
// 进行数据库的连接
 
module.exports = db;
