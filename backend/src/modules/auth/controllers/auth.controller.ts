import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../../../utils/asyncHandler";

const authService = new AuthService();

export class AuthController {
    register = asyncHandler(async (req, res) => {

        const { name, email, password } = req.body;

        const result =
            await authService.register(
                name,
                email,
                password
            );

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: result
        });

    });

    login = asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        const result =
            await authService.login(
                email,
                password
            );

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            data: result

        });

    });

    profile = asyncHandler(async (req, res) => {

    return res.status(200).json({

        success: true,

        message: "Profile fetched successfully",

        data: (req as any).user

        });

    });
}