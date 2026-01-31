
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const folders = await prisma.galleryFolder.findMany({
        take: 1,
        include: {
            _count: {
                select: { images: true, children: true }
            }
        }
    });
    console.log('Folder structure:', JSON.stringify(folders[0], (key, value) =>
        typeof value === 'bigint' ? value.toString() : value, 2));
    await prisma.$disconnect();
}

main();
