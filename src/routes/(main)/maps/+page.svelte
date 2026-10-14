<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_RENDERS_URL } from '$env/static/public';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
	import { prerender } from '../../+layout.ts';
	import Meta from '$lib/meta.svelte';

	interface MapList {
		[name: string]: {
			filesize: number;
			short_name: string;
			filename: string;
			checksum: string;
			outpost?: boolean;
		};
	}

	async function getMaps() {
		const response = await fetch(`${PUBLIC_RENDERS_URL}/maps.json`);

		if (!response.ok) {
			console.error('Failed to fetch new maps, falling back to cached page from 2026/9/17');
			return {};
		}

		const mapData = (await response.json()) as MapList;

		return mapData;
	}
</script>

<svelte:head>
	<Meta title="Maps - Shiptest 13" desc="A basic map viewer." path="/maps" />
</svelte:head>

<h1>Maps</h1>

{#await getMaps()}
	Loading maps...
{:then maps}
	<ul
		class="simple_list"
		style="display: flex; flex-wrap: wrap; gap: 1em; align-items: center; justify-content: center; "
	>
		{#each Object.entries(maps).filter(([, value]) => !value.outpost) as [name, value] (name)}
			<li>
				<span>{name}</span>
				<div
					style="display: flex; align-items: center; justify-content: center; gap: 2px; flex-direction: row; width: 100%"
				>
					<a
						style=""
						href={prerender
							? resolve(`/(main)/map?map=${value.short_name}&hash=${value.checksum}`)
							: resolve(`/(main)/map/[map]?hash=${value.checksum.substring(0, 8)}`, {
									map: value.short_name
								})}>Webmap</a
					>
					<a
						href="{PUBLIC_RENDERS_URL}/base/{value.short_name}.png?hash={value.checksum}"
						rel="external"
						target="_blank"
						><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="1x"></FontAwesomeIcon> Full Render</a
					>
					<a href="https://shiptest.net/wiki/{name}" rel="external" target="_blank"
						><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="1x"></FontAwesomeIcon> Wiki Page</a
					>
				</div>
			</li>
		{/each}
	</ul>

	<h2>Outposts</h2>

	<ul
		class="simple_list"
		style="display: flex; flex-wrap: wrap; gap: 1em; align-items: center; justify-content: center; "
	>
		{#each Object.entries(maps).filter(([, value]) => value.outpost) as [name, value] (name)}
			<li>
				<span>{name}</span>
				<div
					style="display: flex; align-items: center; justify-content: center; gap: 2px; flex-direction: row; width: 100%"
				>
					<a
						style=""
						href={prerender
							? resolve(`/(main)/map?map=${value.short_name}&hash=${value.checksum}`)
							: resolve(`/(main)/map/[map]?hash=${value.checksum.substring(0, 8)}`, {
									map: value.short_name
								})}>Webmap</a
					>
					<a
						href="{PUBLIC_RENDERS_URL}/base/{value.short_name}.png?hash={value.checksum}"
						rel="external"
						target="_blank"
						><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="1x"></FontAwesomeIcon> Full Render</a
					>
				</div>
			</li>
		{/each}
	</ul>
{/await}
