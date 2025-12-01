<script>
    import "./layout.css"
	import favicon from '$lib/assets/favicon.svg';
    import Navbar from "../components/Navbar.svelte"
    import Footer from "../components/Footer.svelte"

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
    <Navbar></Navbar>
    <main>
        {@render children()}
    </main>
    <Footer></Footer>
</div>

<style>
    .app {
        font-family: 'Calibri', 'sans-serif';
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
        min-height: 100vh;
        background-color: white;
    }
</style>
