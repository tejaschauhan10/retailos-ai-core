import { useEffect, useState } from "react";

import { activityService } from "@/core/activity";
import type { ActivityRecord } from "@/core/activity";

export function useActivityFeed(limit = 10): ActivityRecord[] {
  const [items, setItems] = useState<ActivityRecord[]>(() => activityService.list(limit));
  useEffect(() => {
    const unsub = activityService.subscribe(() => setItems(activityService.list(limit)));
    return unsub;
  }, [limit]);
  return items;
}