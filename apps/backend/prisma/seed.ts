import { PrismaClient, UserRolesEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const usersData = [
        {
            email: 'fgpcngladmin@gmail.com',
            phoneNumber: BigInt(9944670582),
            password: 'fgpcngladmin@99582',
            role: UserRolesEnum.ADMIN,
        },
        {
            email: 'fgpcnglmedia@gmail.com',
            phoneNumber: BigInt(9363920889),
            password: 'fgpcnglmedia@93889',
            role: UserRolesEnum.MODERATOR,
        }
    ];

    await prisma.users.createMany({
        data: await Promise.all(
            usersData.map(async (user) => ({
                email: user.email,
                phoneNumber: user.phoneNumber,
                hash: await bcrypt.hash(user.password, 10),
                role: user.role,
            }))
        ),
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
