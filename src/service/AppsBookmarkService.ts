import { getAppBookmarksData } from "@/data-provider/AppBookmarkDataProvider";
import type { AppBookmark } from "@/types/app-bookmarks";

export const getAppBookmarks = (): AppBookmark[] => {
  return getAppBookmarksData();
};