import bcrypt from "bcrypt";
import { User } from "../modules/user/user.model";
import { envVars } from "../config/env";

export const seedUsers = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@demo.com" });
    const userExists = await User.findOne({ email: "user@demo.com" });

    const passwordHash = await bcrypt.hash("password123", Number(envVars.BCRYPT_SALT_ROUND));

    if (!adminExists) {
      await User.create({
        name: "Admin Demo",
        email: "admin@demo.com",
        password: passwordHash,
        role: "admin",
        isVerified: true
      });
      console.log("Admin Demo user seeded: admin@demo.com / password123");
    } else {
      console.log("Admin Demo user already exists.");
    }

    if (!userExists) {
      await User.create({
        name: "Candidate Demo",
        email: "user@demo.com",
        password: passwordHash,
        role: "candidate",
        isVerified: true
      });
      console.log("Candidate Demo user seeded: user@demo.com / password123");
    } else {
      console.log("Candidate Demo user already exists.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
