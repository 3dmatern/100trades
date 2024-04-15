"use server";

import { unstable_noStore as noStore } from "next/cache";

import { db } from "@/lib/db";
import { TagSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getAllTag, getByIDs, getIDs, getTagById, getTagByUserId, getTagByValue, removeByIDs } from "@/data/tag";

export const createTag = async (values) => {
  noStore();
  const validatedFields = TagSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Введите значение!",
    };
  }
  const { userId, label, value } = validatedFields.data;

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingTag = await getTagByValue(value);
  if (existingTag) {
    return {
      newTag: existingTag,
      success: "Тег успешно добавлен",
    };
  }

  try {
    const newTag = await db.tag.create({
      data: {
        userId,
        label,
        value,
      },
    });

    return {
      newTag,
      success: "Тег успешно создан!",
    };
  } catch (error) {
    console.error("Error creating tag: ", error);
    return {
      error: "Ошибка создания тега!",
    };
  }
};

export const getTags = async (userId) => {
  noStore();

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const tags = await getTagByUserId(existingUser.id);

    return tags;
  } catch (error) {
    console.error("Error receiving tags: ", error);
    return {
      error: "Ошибка получения тегов!",
    };
  }
};

export const getTag = async (tagId) => {
  noStore();

  try {
    const tag = await getTagById(tagId);
    return tag;
  } catch (error) {
    console.error("Error receiving tag: ", error);
    return {
      error: "Ошибка получения тега!",
    };
  }
};

export const getTagIDs = async (skip, take) => {
  try {
    const tagIDs = await getIDs(skip, take);
    return {
      success: tagIDs,
    };
  } catch (error) {
    console.error("Error receiving offset tagIDs: ", error);
    return {
      error: "Ошибка получения количества тегов!"
    }
  }
};

export const getTagByIDs = async (tagIDs) => {
  try {
    const tagsByIDs = await getByIDs(tagIDs);
    return {
      success: tagsByIDs,
    };
  } catch (error) {
    console.error("Error receiving tagsByIDs: ", error);
    return {
      error: "Ошибка получения тегов!",
    }
  }
};

export const removeTagByIDs = async (ids) => {
  try {
    const result = await removeByIDs(ids);
    return {
      success: result,
    };
  } catch (error) {
    console.error('Error delete tagByIDs: ', error);
    return {
      error: "Ошибка при удалении тегов!",
    }
  }
};