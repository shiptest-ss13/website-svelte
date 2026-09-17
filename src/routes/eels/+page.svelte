<script>
	import eels from '$lib/assets/eels.gif';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>eels?</title>
	<meta name="title" content="eels?" />
	<meta name="description" content="eels?" />
	<meta name="theme-color" content="#cc8899" />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shiptest.net/eels" />
	<meta property="og:title" content="eels?" />
	<meta property="og:description" content="eels?" />
	<meta property="og:image" content={eels} />
	<meta property="og:image:type" content="image/gif" />
	<meta
		property="og:image:alt"
		content="Flaming text that reads the word eels with a question mark."
	/>
	<meta property="og:site_name" content="eels?" />
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://shiptest.net/eels" />
	<meta property="twitter:title" content="eels?" />
	<meta property="twitter:description" content="eels?" />
	<meta property="twitter:image" content={eels} />
</svelte:head>

<picture>
	<img src={eels} alt="" />
</picture>
