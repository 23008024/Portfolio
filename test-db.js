const prisma = require("./config/db");

async function test() {
  try {
    await prisma.$connect();
    console.log("Database connection SUCCESS ✅");
  } catch (err) {
    console.error("FAILED ❌", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();