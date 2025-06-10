"use server";

import { z } from "zod";
import { db } from "@repo/db";
import { render } from "@react-email/render";
import { ResetPasswordEmailComponent } from "@/components/email/resetPassword";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
import { resetPasswordSchema } from "@/lib/zod/schema";
import { transporter } from "@/lib/transporter";

export const sendResetPasswordLinkAction = async (
  data: z.infer<typeof resetPasswordSchema>
) => {
  const { email } = data;

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "No user found with that email address",
    };
  }

  if (user.forgotPasswordToken && user.forgotPasswordToken !== "") {
    return {
      success: false,
      error:
        "A password reset request is already in progress. Please check your email.",
    };
  }

  const resetToken = createId();

  await db.user.update({
    where: {
      email,
    },
    data: {
      forgotPasswordToken: resetToken,
    },
  });

  const html = await render(
    ResetPasswordEmailComponent({
      name: user.name ?? "User",
      resetPasswordToken: resetToken,
    })
  );

  await transporter.sendMail({
    from: `Reset Password <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Reset your password",
    html,
  });

  return {
    success: true,
    message:
      "An email has been sent to your email address with instructions to reset your password.",
  };
};

export const resetPasswordAction = async (
  token: string,
  newPassword: string
) => {
  const user = await db.user.findFirst({
    where: {
      forgotPasswordToken: token,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "Invalid or expired password reset token",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashPassword,
      forgotPasswordToken: null,
    },
  });

  return {
    success: true,
    message: "Your password has been successfully reset.",
  };
};

export const changePasswordAction = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "No user found with that email address",
    };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      error: "Old password is incorrect",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashPassword,
    },
  });

  return {
    success: true,
    message: "Your password has been successfully changed.",
  };
};
