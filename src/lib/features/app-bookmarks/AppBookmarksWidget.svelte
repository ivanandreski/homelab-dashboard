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
		<a class="app-bookmark-link" href={appBookmark.url}>
			<div class="app-bookmark-content-container">
				<img src={getSafeImageContentFromBase64(appBookmark.icon)} alt="{appBookmark.name} icon" />
			</div>
			<div class="app-bookmark-content-container">
				<span>{appBookmark.name}</span>
			</div>
		</a>
	</li>
{/snippet}

<style>
	.widget {
		display: inline-block;
	}

	h2 {
		text-align: center;
	}

	ul {
		display: flex;
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
		margin: 0 10px;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:hover {
		background-color: #f0f0f0;
	}

	.app-bookmark-link {
		display: block;
		border: 1px solid gray;
		border-radius: 10%;
		padding: 10px;
		width: 7em;
		height: 5em;
	}

	.app-bookmark-content-container {
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.app-bookmark-content-container span {
		font-weight: bold;
		text-align: center;
	}

	.app-bookmark-content-container img {
		width: 35px;
	}
</style>
