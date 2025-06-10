"use server";

import { z } from "zod";
import { db } from "@repo/db";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/zod/schema";
import { createId } from "@paralleldrive/cuid2";
import { render } from "@react-email/render";
import { VerifyEmailComponent } from "@/components/email/verifyEmail";
import { transporter } from "@/lib/transporter";

export const signUpAction = async (data: z.infer<typeof signUpSchema>) => {
  const userExists = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    return {
      success: false,
      message: "User already exists with this email address",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const emailVerificationToken = createId();

    const user = await db.user.create({
      data: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        password: hashedPassword,
        provider: "CREDENTIALS",
        verificationToken: emailVerificationToken,
      },
    });

    const verificationMailHtml = await render(
      VerifyEmailComponent({
        verificationToken: emailVerificationToken,
      })
    );

    await transporter.sendMail({
      from: `Verify Email Address <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Verify your Email Address",
      html: verificationMailHtml,
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
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
