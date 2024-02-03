const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("", 10);
    const users = [
        {
            email: "",
            password: hashedPassword,
            emailVerified: new Date(),
        },
        {
            email: "",
            password: hashedPassword,
            emailVerified: new Date(),
        },
    ];

    const results = [
        {
            label: "win",
            value: "#BFD8AF",
            type: 1,
        },
        {
            label: "loss",
            value: "#FF8080",
            type: 2,
        },
        {
            label: "бу",
            value: "#EEEEEE",
            type: 3,
        },
        {
            label: "активна",
            value: "#FFCF81",
            type: 4,
        },
    ];

    for (const result of results) {
        const res = await prisma.result.create({
            data: result,
        });
        console.log("Добавлен: ", res);
    }

    for (const user of users) {
        const us = await prisma.user.create({
            data: user,
        });
        console.log("Добавлен: ", us);
    }

    console.log("Всё добавил :)");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
