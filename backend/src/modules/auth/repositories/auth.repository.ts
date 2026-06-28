import prisma from "../../../config/prisma";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken
      }
    });
  }

  async findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
}
}