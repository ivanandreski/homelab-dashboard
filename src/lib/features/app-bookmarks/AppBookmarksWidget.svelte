<script lang="ts">
	import type { AppBookmark } from '@/types/app-bookmarks';
	import { getSafeImageContentFromBase64 } from '@/utils/image-utils';

	let appBookmarks: AppBookmark[] = $state([]);

	$effect(() => {
		const response = fetch('/api/app-bookmarks');
		response
			.then((res) => res.json())
			.then((data) => (appBookmarks = data))
			.catch((error) => {
				console.error('Error fetching app bookmarks:', error);
			});
	});
</script>

<div class="widget">
	<h2>Apps Bookmark</h2>
	<ul>
		{#each appBookmarks as appBookmark}
			{@render appBookmarkSnippet(appBookmark)}
		{/each}
	</ul>
</div>

{#snippet appBookmarkSnippet(appBookmark: AppBookmark)}
	<li>
		<img
			src={getSafeImageContentFromBase64(appBookmark.icon)}
			alt="{appBookmark.name} icon"
			style="width: 25px;"
		/>
		<a href={appBookmark.url}>{appBookmark.name}</a>
	</li>
{/snippet}
