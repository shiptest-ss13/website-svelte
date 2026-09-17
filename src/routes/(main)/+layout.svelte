<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import {
		faHome,
		faRocket,
		faChartLine,
		faCommentAlt,
		faExclamationCircle,
		faMapMarkedAlt,
		faBook,
		faCode
	} from '@fortawesome/free-solid-svg-icons';
	import { faDiscord, faGithub, faWikipediaW } from '@fortawesome/free-brands-svg-icons';
	import { resolve } from '$app/paths';

	import overmapThumb from '$lib/assets/overmap.webp';

	import '../../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" />

	<meta property="og:site_name" content="Shiptest" />
	<meta property="og:image" content={overmapThumb} />
	<meta property="og:type" content="website" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={overmapThumb} />
</svelte:head>

<div class="layer1">
	Background Animation - Credit to AffectedArc07 from the SS13 WebMap
	https://affectedarc07.github.io/SS13WebMap/
</div>
<div class="layer2"></div>
<div class="layer3"></div>

<main class="mainbox">
	<ul class="topnav">
		<li>
			<a href={resolve('/')}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home</a>
		</li>
		<li>
			<a href="byond://join.shiptest.net:41372"
				><FontAwesomeIcon icon={faRocket}></FontAwesomeIcon> Join</a
			>
		</li>
		<li>
			<a href="https://shiptest.net/stats"
				><FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon> Stats</a
			>
		</li>
		<li>
			<a href="https://github.com/shiptest-ss13/Shiptest"
				><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> Github</a
			>
		</li>
		<li>
			<a href="https://codedocs.shiptest.net"
				><FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Codedocs</a
			>
		</li>
		<li>
			<a href="https://shiptest.net/wiki/Main_Page"
				><FontAwesomeIcon icon={faWikipediaW}></FontAwesomeIcon> Wiki</a
			>
		</li>
		<li>
			<a href="https://forums.shiptest.net"
				><FontAwesomeIcon icon={faCommentAlt}></FontAwesomeIcon> Forum</a
			>
		</li>
		<!--<li>
			<a href="https://hackmd.io/@shiptest"
				><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> HackMD</a
			>
		</li>-->
		<li>
			<a href="https://status.shiptest.net"
				><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon> Status</a
			>
		</li>
		<li>
			<a href={resolve('/maps')}><FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon> Maps</a>
		</li>
		<li class="right">
			<a href={resolve('/discord')}><FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon> Discord</a>
		</li>
	</ul>

	{@render children()}

	<p>
		<small
			><a href="https://github.com/shiptest-ss13/website-svelte">source code</a>
			<FontAwesomeIcon icon={faCode}></FontAwesomeIcon></small
		>
	</p>
</main>
