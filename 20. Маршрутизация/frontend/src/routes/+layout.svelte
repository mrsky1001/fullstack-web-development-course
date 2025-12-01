<script>
    import '../app.css'
    import Navbar from "../components/base/Navbar.svelte"
    import Footer from "../components/base/Footer.svelte"

    let {children} = $props()
</script>

<div class="app">
    <Navbar></Navbar>
    <main>
        {@render children()}
    </main>
    <Footer></Footer>
</div>

<style>
    .app {
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
