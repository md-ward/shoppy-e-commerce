import { PrismaClient } from "../../prisma/generated";
import { newUser } from "../controllers/userController";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    const name = "Admin";

    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email: adminEmail,
        role: "Admin",
      },
    });
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
