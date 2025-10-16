import { faker } from "@faker-js/faker";
import { PrismaClient } from "../generated/prisma/client";
import { min } from "class-validator";
import { stringify } from "querystring";
import { hash } from "argon2";


const prisma = new PrismaClient();

function generateSlug(title: string): string {
    return title.toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

async function  main() {
    const defaultPassword  = await hash("123");
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        password: defaultPassword,

    }));

    await prisma.user.createMany({
        data: users,
    });

    const posts = Array.from({ length: 400 }).map(() => ({
        title: faker.lorem.sentence(),
        slug: generateSlug(faker.lorem.sentence()),
        content: faker.lorem.paragraphs(3),
        thumbnail: faker.image.urlLoremFlickr({ height:240 , width:320 }),
        published: true,
        authorId: faker.number.int({ min: 1, max: 10 }),
    }));

    Promise.all(
        posts.map(async (post) => {
            await prisma.post.create({
                data: {
                    ...post,
                    comments: {
                        createMany: {
                            data: Array.from({ length: 20 }).map(() => ({
                                content: faker.lorem.sentence(),
                                authorId: faker.number.int({ min: 1, max: 10 }),
                            })),

                        }
                    }
                }
            });
        })
    );
    console.log('Seeding completed.');
};

main().then(async () => {
    await prisma.$disconnect();
    process.exit(0);
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});