import prisma from "../src/lib/prisma";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      handle: "demo",
      firstName: "Demo",
      lastName: "User",
      image: "https://placehold.co/96x96",
    },
  });

  const medieval = await prisma.tag.upsert({
    where: { name: "Medieval" },
    update: {},
    create: { name: "Medieval" },
  });

  await prisma.build.create({
    data: {
      title: "Cozy Medieval Cottage",
      heroImage: "https://placehold.co/1200x630",
      link: "https://example.com", // required by your schema
      biome: "FOREST",
      createdById: user.id,
      tags: { connect: [{ id: medieval.id }] },
      images: { create: [{ url: "https://placehold.co/800x600", width: 800, height: 600 }] },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());