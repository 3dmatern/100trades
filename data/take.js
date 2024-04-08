import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTake = async () => {
  noStore();
  try {
    const allTake = await db.take.findMany();

    return allTake;
  } catch (error) {
    return null;
  }
};

export const getTakeByUserId = async (userId) => {
  noStore();
  try {
    const takes = await db.take.findMany({
      where: {
        userId,
      },
    });

    return takes;
  } catch (error) {
    return null;
  }
};

export const getTakeById = async (id) => {
  noStore();
  try {
    const take = await db.take.findUnique({
      where: {
        id,
      },
    });

    return take;
  } catch (error) {
    return null;
  }
};

export const getTakeByValue = async (value) => {
  noStore();
  try {
    const take = await db.take.findUnique({
      where: {
        value,
      },
    });

    return take;
  } catch (error) {
    return null;
  }
};
