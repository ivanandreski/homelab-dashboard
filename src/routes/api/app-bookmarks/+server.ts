import { getAppBookmarks } from "@/service/AppsBookmarkService";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () => {
  return json(getAppBookmarks());
}