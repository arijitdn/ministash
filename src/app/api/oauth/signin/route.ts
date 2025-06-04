import { auth, signIn, signOut } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      {
        error: "Invalid OAuth token provided",
      },
      {
        status: 400,
      }
    );
  }

  const data = await db.oAuthToken.findFirst({
    where: {
      token,
    },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: "Invalid OAuth token provided",
      },
      {
        status: 400,
      }
    );
  }

  const oAuthUser = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!oAuthUser) {
    return NextResponse.json(
      {
        error: "Invalid OAuth token provided",
      },
      {
        status: 400,
      }
    );
  }

  const currentSession = await auth();

  if (currentSession) {
    return NextResponse.json({
      message: "Sign out first to signin in another account.",
    });
  }

  await signIn("credentials", {
    oauth: token,
    redirectTo: "/profile",
  });

  return NextResponse.json({
    message: "Signin in...",
  });
}
