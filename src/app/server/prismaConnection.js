import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
(async function checkConnection() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:");
    process.exit(1);
  }
})();
export default prisma;

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// (async function checkConnection() {
//   try {
//     await prisma.$connect();
//     console.log("Prisma connected to the database.");
//   } catch (error) {
//     console.error("Failed to connect to the database:");
//     process.exit(1);
//   }
// })();
// export default prisma;
