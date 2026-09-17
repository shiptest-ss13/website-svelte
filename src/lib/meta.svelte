<script lang="ts">
	import type { Pathname } from '$app/types';

	let {
		title,
		path,
		desc = 'Shiptest is a fork of Space Station 13 centering around ships, their crews, and exploration.'
	}: { title: string; desc?: string; path: Pathname } = $props();
</script>

<title>{title}</title>

<link rel="canonical" href="https://shiptest.net{path}" />
<meta name="description" content={desc} />
<meta name="theme-color" content="#888888" />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={desc} />
<meta property="og:url" content="https://shiptest.net{path}" />

<!-- Twitter -->
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={desc} />
<meta property="twitter:url" content="https://shiptest.net{path}" />

<meta name="description" content={desc} />
