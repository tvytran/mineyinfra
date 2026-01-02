import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
	var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
// Use Prisma 7 driver adapter for Postgres
const pool = new pg.Pool(
	connectionString ? { connectionString } : undefined
);
const adapter = new PrismaPg(pool);

export const prisma: PrismaClient =
	global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}

export default prisma;