<script>
    import "./layout.css"
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
    <header>
        <p>ivan-ivanov-frontend</p>
    </header>
    <main>
        {@render children()}
    </main>

    <footer>
        <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
    </footer>
</div>

<style>
</style>
