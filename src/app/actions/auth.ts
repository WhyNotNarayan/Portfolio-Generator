"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function signUpUser(formData: FormData) {
  const email = (formData.get("email") as string)?.toLowerCase();
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user record
    const user = await prisma.user.create({
      data: {
        email,
        name: name || "Anonymous User",
        password: hashedPassword,
      }
    });

    return { success: true, userId: user.id };

  } catch (error: any) {
    console.error("Signup error:", error);
    return { error: "Failed to create account. Please try again." };
  }
}
