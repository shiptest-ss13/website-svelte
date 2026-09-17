<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_RENDERS_URL } from '$env/static/public';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
	import { onMount } from 'svelte';
	import { prerender } from '../../+layout.ts';
	import Maps from '$lib/maps.json';
	import Meta from '$lib/meta.svelte';

	interface MapList {
		[name: string]: {
			filesize: number;
			short_name: string;
			filename: string;
			checksum: string;
		};
	}

	let maps: MapList = $state(Maps);

	onMount(async () => {
		const response = await fetch(`${PUBLIC_RENDERS_URL}/maps.json`);

		if (!response.ok) {
			return;
		}

		const mapData = (await response.json()) as MapList;

		maps = mapData;
	});
</script>

<svelte:head>
	<Meta title="Maps - Shiptest 13" desc="A basic map viewer." path="/maps" />
</svelte:head>

<h1>Maps</h1>

<ul
	class="simple_list"
	style="display: flex; flex-wrap: wrap; gap: 1em; align-items: center; justify-content: center; "
>
	{#each Object.entries(maps) as [name, value] (name)}
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
