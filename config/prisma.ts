import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function exclude(user: any, keys: any) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}
export { prisma, exclude };
