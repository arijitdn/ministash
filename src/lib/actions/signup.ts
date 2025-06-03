"use server";

import { z } from "zod";
import db from "../db";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/app/auth/signup/page";

export const signUpAction = async (data: z.infer<typeof signUpSchema>) => {
  const userExists = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    return {
      success: false,
      error: "User already exists with this email address",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const user = await db.user.create({
      data: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        password: hashedPassword,
        provider: "CREDENTIALS",
      },
    });

    if (user) {
      return {
        success: true,
        message:
          "Registration successfull. Please verify your email address and then login.",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong. Please try again later!",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
