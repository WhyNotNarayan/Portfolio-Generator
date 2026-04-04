"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function loginUser(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    // 2. Validate Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return { error: "Invalid email or password." };
    }
    
    return { success: true, userId: user.id, userName: user.name };

  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Login failed. Please check your credentials." };
  }
}
