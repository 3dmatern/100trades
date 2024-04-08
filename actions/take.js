"use server";

import { unstable_noStore as noStore } from "next/cache";

import { db } from "@/lib/db";
import { TakeSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getTakeByUserId, getTakeByValue } from "@/data/take";

export const createTake = async (values) => {
  noStore();

  const validatedFields = TakeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Введите значение",
    };
  }
  const { userId, label, value } = validatedFields.data;

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingTake = await getTakeByValue(value);
  if (existingTake) {
    return {
      newTake: existingTake,
      success: "Тейк успешно добавлен",
    };
  }

  try {
    const newTake = await db.take.create({
      data: {
        userId,
        label,
        value,
      },
    });

    return {
      newTake,
      success: "Тейк успешно создан",
    };
  } catch (error) {
    console.error("Error creating take: ", error);
    return {
      error: "Ошибка создания тейка!",
    };
  }
};

export const getTakes = async (userId) => {
  noStore();

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const takes = await getTakeByUserId(existingUser.id);

    return takes;
  } catch (error) {
    console.error("Error receiving takes: ", error);
    return {
      error: "Ошибка получения тейков!",
    };
  }
};
