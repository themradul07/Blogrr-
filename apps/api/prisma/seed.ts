import { faker } from "@faker-js/faker";
import { PrismaClient } from "../generated/prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

async function main() {
  const defaultPassword = await hash("123");

  // ✅ Create 10 users
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({ data: users });
  console.log("✅ Users created.");

  // ✅ Generate 400 posts
  const posts = Array.from({ length: 400 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320 }),
    published: true,
    authorId: faker.number.int({ min: 1, max: 10 }),
  }));

  console.log("🌱 Seeding posts and comments...");

  // ✅ Batch insertion to prevent connection exhaustion
  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        comments: {
          createMany: {
            data: Array.from({ length: 20 }).map(() => ({
              content: faker.lorem.sentence(),
              authorId: faker.number.int({ min: 1, max: 10 }),
            })),
          },
        },
      },
    });
  }

  console.log("✅ Posts and comments created.");
}

main()
  .then(async () => {
    console.log("🎉 Seeding completed successfully!");
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
