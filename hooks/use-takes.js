import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTakes } from "@/actions/take";

export function useTakes(userId) {
  const [takes, setTakes] = useState([]);

  useEffect(() => {
    if (userId) {
      const getData = async () => {
        const takesData = await getTakes(userId);
        if (takesData && takesData.error) {
          toast.error(takesData.error);
        } else {
          setTakes(takesData);
        }
      };
      getData();
    } else {
      setTakes([]);
    }
  }, [userId]);

  return { takes };
}
