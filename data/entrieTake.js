import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEntrieTakesByEntrieId = async (entrieId) => {
  noStore();
  try {
    const entrieTakes = await db.entrieTake.findMany({
      where: {
        entrieId,
      },
      orderBy: {
        date: "asc",
      },
    });

    return entrieTakes;
  } catch (error) {
    return null;
  }
};

export const getEntrieTakeByEntrieIdTakeId = async ({ entrieId, takeId }) => {
  noStore();
  try {
    const entrieTake = await db.entrieTake.findFirst({
      where: {
        entrieId,
        takeId,
      },
      orderBy: {
        date: "asc",
      },
    });

    return entrieTake;
  } catch (error) {
    return null;
  }
};
