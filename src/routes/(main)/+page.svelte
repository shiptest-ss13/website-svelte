<script lang="ts">
	import { resolve } from '$app/paths';

	import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW';
	import { faCodeCompare } from '@fortawesome/free-solid-svg-icons/faCodeCompare';
	import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';

	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import ShiptestButton from '$lib/assets/shiptest-button.gif';
	import YogsButton from '$lib/assets/yogstation.gif';
	import StellersButton from '$lib/assets/stellersbutton.gif';
	import { faWikiIcon, forumPosts, githubPrs, wikiChanges } from '$lib/fetchfunctions';
	import Meta from '$lib/meta.svelte';

	const progReports = fetch('https://progress.shiptest.net/index.html').then((result) =>
		result.text()
	);
	function limitTextSize(value: string, length = 40) {
		return value.length > length ? value.substring(0, length) + '...' : value;
	}

	const htmlRemove = /<[^>]+>/g;
</script>

<svelte:head>
	<Meta path="/" title="Shiptest 13" />
</svelte:head>

<h1 id="shiptest-13">Shiptest 13</h1>
<p>
	Shiptest 13 is a fork of Space Station 13 (specifically /tg/station-whitesands code) centering
	around exploration of the universe. Gameplay takes place on ships, which can be flown in an
	&quot;overmap&quot; which represents areas you can travel in solar systems and beyond. (Learn more
	about the overmap <a href="https://shiptest.net/wiki/Guide_to_the_Overmap">here, on our wiki!</a>)
</p>
<p>Be sure to join our <a href={resolve('/discord')}>discord!</a></p>

<a href="byond://join.shiptest.net:41372"
	><img
		src={ShiptestButton}
		alt="A pixel-art retro web button showing the shiptest logo (sillouhette of a ship in front of a planet eclipsing a star) next to the words 'Shiptest 13' and the BYOND logo."
	/></a
>
<br />
<a href="https://yogstation.net" rel="external" target="_blank"
	><img
		src={YogsButton}
		title="Yoggerz forever..."
		alt="A pixel-art button showing the Yogstation 13 logo."
	/></a
>
<a href="https://stellers.gay" rel="external" target="_blank"
	><img
		src={StellersButton}
		title="Mark( the host and designer of this site)'s homepage!"
		alt="An animated button showing a pixelated sleeping blue jay raptor-creature. Credit to Rylie/RyeRice!"
	/></a
>

<div style="display: flex; gap: 1em; max-height: 75vh; min-height: 15em">
	<div style="flex: 1; background-color: #383838;">
		<h2>
			<a href="https://shiptest.net/wiki/Special:RecentChanges">
				<FontAwesomeIcon icon={faWikipediaW}></FontAwesomeIcon> Recent Wiki Changes</a
			>
		</h2>
		{#await wikiChanges()}
			Loading wiki changes...
		{:then changes}
			<ul class="simple_list">
				{#each changes as change ((change.title, change.timestamp))}
					<li>
						<a
							style="font-size: 12px"
							href="https://shiptest.net/wiki/{change.title}"
							target="_blank"
							title={new Date(change.timestamp).toLocaleString()}
							><FontAwesomeIcon icon={faWikiIcon(change.type)}></FontAwesomeIcon>
							{change.title}: {limitTextSize(change.comment)} ({change.user})</a
						>
					</li>
				{/each}
			</ul>
		{:catch err}
			Error fetching wiki changes: {err}
		{/await}
	</div>

	<div style="flex: 1; background-color: #383838;">
		<h2>
			<a href="https://github.com/shiptest-ss13/shiptest">
				<FontAwesomeIcon icon={faCodeCompare}></FontAwesomeIcon> Recent Pull Requests</a
			>
		</h2>

		{#await githubPrs()}
			Loading...
		{:then prs}
			<ul class="simple_list">
				{#each prs as pr (pr.number)}
					<li>
						<a
							style="font-size: 12px"
							href={pr.html_url}
							rel="external"
							target="_blank"
							title={new Date(pr.updated_at || pr.created_at).toLocaleString()}
							><FontAwesomeIcon icon={pr.icon} style="color: {pr.iconColor}"></FontAwesomeIcon> #{pr.number}:
							{pr.title}</a
						>
					</li>
				{/each}
			</ul>
		{:catch err}
			Error fetching latest Github PRs: {err}
		{/await}
	</div>

	<div style="flex: 1; background-color: #383838;">
		<h2>
			<a href="https://forums.shiptest.net">
				<FontAwesomeIcon icon={faMessage}></FontAwesomeIcon> Recent Forum Posts</a
			>
		</h2>

		{#await forumPosts()}
			Loading forum results...
		{:then posts}
			<ul class="simple_list">
				{#each posts as post (post.id)}
					<li>
						<a
							style="font-size: 12px"
							href="https://forums.shiptest.net/d/{post.discussion.slug}/{post.number}"
							target="_blank"
							title={new Date(post.createdAt).toLocaleString()}
							><b>{post.discussion.title}</b> &gt;
							{post.user.displayName}: {post.content &&
								limitTextSize(post.content.replace('<img', '(image) <').replace(htmlRemove, ''))}</a
						>
					</li>
				{/each}
			</ul>
		{:catch err}
			Error fetching forum results: {err}
		{/await}
	</div>
</div>

<div style="overflow-y: auto; overflow-x: hidden; max-height: 75vh; min-height: 15em">
	<h2>Progress Reports</h2>

	{#await progReports}
		Loading...
	{:then progText}
		{@html progText}
	{:catch}
		Error fetching progress reports! View the main progress reports page <a
			href="https://progress.shiptest.net/index.html">here</a
		>.
	{/await}
</div>
