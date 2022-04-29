import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {

  /**
   * find user by phone
   * @param phone - a user's phone number
   */
  public async findUserByPhone(phone: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        phone: parseInt(phone, 10),
      },
    });
    return user;
  }

  /**
   * find user by email
   * @param email - a user's email
   */
  public async findUserByEmail(email: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  /**
   * find user by id
   * @param id - a user's id
   */
  public async findUserById(id: string) {
    const prisma = require("../../utils/db");
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
