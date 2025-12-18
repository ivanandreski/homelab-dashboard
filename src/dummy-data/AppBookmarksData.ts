import type { AppBookmark } from "@/types/app-bookmarks";
import { PLEX_BASE64, QBITTORRENT_BASE64 } from "./AppBookmarksImageData";

export const APP_BOOKMARKS_DUMMY_DATA: AppBookmark[] = [
	{
		name: 'QBitTorrent',
		url: '#',
		icon: QBITTORRENT_BASE64
	},
  {
    name: 'Plex Admin',
    url: '#',
    icon: PLEX_BASE64
  },
  {
    name: 'App without icon',
    url: '#'
  }
];

