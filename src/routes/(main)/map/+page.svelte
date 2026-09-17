<script lang="ts">
	import { PUBLIC_RENDERS_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import { resolve } from '$app/paths';
	import { faArrowLeft, faExpand } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import Meta from '$lib/meta.svelte';

	let title = $state('Map');
	let hash = $state('');

	onMount(async () => {
		const L = await import('leaflet');

		const assets = PUBLIC_RENDERS_URL;
		const settings = {
			minZoom: 1,
			maxZoom: 6,
			minNativeZoom: 1,
			maxNativeZoom: 4,
			nowrap: true
		};

		const searchParams = new URLSearchParams(location.search);
		const mapname = searchParams.get('map');

		if (mapname == null) {
			window.location.replace(resolve('/maps'));
			return;
		}

		title = mapname;
		hash = searchParams.get('hash') || location.hash;

		const base = L.tileLayer(assets + 'base/' + mapname + '/{z}/{x}/{y}.webp?' + hash, settings);

		const areas = L.tileLayer(assets + 'areas/' + mapname + '/{z}/{x}/{y}.webp?' + hash, settings);

		const pipenet = L.tileLayer(
			assets + 'pipenet/' + mapname + '/{z}/{x}/{y}.webp?' + hash,
			settings
		);

		const powernet = L.tileLayer(
			assets + 'powernet/' + mapname + '/{z}/{x}/{y}.webp?' + hash,
			settings
		);

		const map = L.map('mapbox', {
			attributionControl: false,
			minZoom: 1,
			maxBoundsViscosity: 1.0,
			maxZoom: 6,
			crs: L.CRS.Simple,
			layers: [base]
		}).setView([-64, 64], 2);

		const baseMaps = {
			Ship: base,
			Areas: areas
		};

		const overlayMaps = {
			Pipes: pipenet,
			Cables: powernet
		};

		L.control.layers(baseMaps, overlayMaps).addTo(map);
	});
</script>

<svelte:head>
	<Meta title="Map Viewer - Shiptest 13" desc="A basic map viewer." path="/map" />
</svelte:head>

<h1>{title}</h1>

<div id="mapbox" class="mapbox" style="width: auto; height: 100%;"></div>

<p>
	<a href={resolve('/maps')}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back</a> |
	<a href={resolve(`/fullmap?map=${title}&hash=${hash}`)}
		><FontAwesomeIcon icon={faExpand}></FontAwesomeIcon> Full Screen</a
	>
</p>

<style>
	.mapbox {
		width: 100%;
		height: 0;
		padding-bottom: 50%;
		background-image: url('/images/layer1.webp');
		animation: animateBackground 20s linear infinite;
		background-repeat: repeat;
	}
</style>
