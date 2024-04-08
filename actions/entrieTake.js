"use server";

import { unstable_noStore as noStore } from "next/cache";

import { db } from "@/lib/db";
import { EntrieTakeSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getTakeById } from "@/data/take";
import { getEntrieById } from "@/data/entrie";
import {
  getEntrieTakeByEntrieIdTakeId,
  getEntrieTakesByEntrieId,
} from "@/data/entrieTake";

export const createEntrieTake = async (userId, values) => {
  noStore();

  const validatedFields = EntrieTakeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Введите значение или создайте запись",
    };
  }
  const { entrieId, takeId } = validatedFields.data;

  const existingEntrie = await getEntrieById(entrieId);
  if (!existingEntrie) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingTake = await getTakeById(takeId);
  if (!existingTake) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    await db.entrieTake.create({
      data: { entrieId, takeId },
    });

    return {
      success: "Тейк успешно добавлен!",
    };
  } catch (error) {
    console.error("Error creating entrieTake: ", error);
    return {
      error: "Ошибка добавления тейка!",
    };
  }
};

export const getEntrieTakes = async (entrieId) => {
  noStore();
  try {
    const entrieTakes = await getEntrieTakesByEntrieId(entrieId);

    return { entrieTakes };
  } catch (error) {
    console.error("Error receiving entrieTakes: ", error);
    return {
      error: "Ошибка получения тейков!",
    };
  }
};

export const removeEntrieTake = async (userId, entrieTake) => {
  noStore();

  const existingEntrieTake = await getEntrieTakeByEntrieIdTakeId(entrieTake);
  if (!existingEntrieTake) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    await db.entrieTake.delete({
      where: {
        id: existingEntrieTake.id,
        entrieId: existingEntrieTake.entrieId,
        takeId: existingEntrieTake.takeId,
      },
    });

    return {
      success: "Тейк успешно удален!",
    };
  } catch (error) {
    console.error("Error deleting entrieTake: ", error);
    return {
      error: "Ошибка удаления тейка!",
    };
  }
};
