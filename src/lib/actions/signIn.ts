"use server";

import { z } from "zod";
import { signInSchema } from "@/lib/zod/schema";
import db from "../db";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const signInAction = async (data: z.infer<typeof signInSchema>) => {
  const userExists = await db.user.findFirst({
    where: {
      email: data.email,
      provider: "CREDENTIALS",
    },
  });

  if (!userExists || !userExists.password || !userExists.email) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  if (!userExists.verified) {
    return {
      success: false,
      error: "Please verify your email address",
    };
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    userExists.password
  );

  if (!passwordMatch) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  try {
    await signIn("credentials", {
      email: userExists.email,
      password: data.password,
      redirectTo: "/files",
    });
    return {
      success: true,
      message: "User logged in successfully",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          return {
            success: false,
            error: "Invalid credentials",
          };
        }

        default: {
          return {
            success: false,
            error: "Something went wrong",
          };
        }
      }
    }

    throw err;
  }
};
