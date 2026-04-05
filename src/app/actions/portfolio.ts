"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePortfolio(userId: string, content: any, templateId: string) {
  if (!userId) return { error: "User authentication required" };

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        templateId,
        content,
      }
    });

    return { success: true, portfolioId: portfolio.id };
  } catch (error) {
    console.error("Save portfolio error:", error);
    return { error: "Failed to save your portfolio." };
  }
}
