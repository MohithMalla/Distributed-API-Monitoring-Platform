import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../../utils/jwt";
import { AppError } from "../../../utils/AppError";

export class AuthService {
  private authRepository = new AuthRepository();

  async register(
    name: string,
    email: string,
    password: string
  ) {
    const existingUser =
      await this.authRepository.findUserByEmail(email);

    if (existingUser) {
    throw new AppError(
        "User already exists",
        409
    );
}

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await this.authRepository.createUser({
        name,
        email,
        password: hashedPassword
      });

    const accessToken =
      generateAccessToken({
        userId: user.id,
        role: user.role
      });

    const refreshToken =
      generateRefreshToken({
        userId: user.id
      });

    await this.authRepository.updateRefreshToken(
      user.id,
      refreshToken
    );

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async login(email: string, password: string) {
  const user = await this.authRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError(
        "Invalid email or password",
        401
    );
}

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(
        "Invalid email or password",
        401
    );
}

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role
  });

  const refreshToken = generateRefreshToken({
    userId: user.id
  });

  await this.authRepository.updateRefreshToken(
    user.id,
    refreshToken
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  };
}
}