import { dev } from '$app/environment';
import { APP_BOOKMARKS_DUMMY_DATA } from '@/dummy-data/AppBookmarksData';
import type { AppBookmark } from '@/types/app-bookmarks';

export const getAppBookmarksData = (): AppBookmark[] => {
	if (dev) {
		return APP_BOOKMARKS_DUMMY_DATA;
	}

	// Fetch real data logic here
	return [];
};
