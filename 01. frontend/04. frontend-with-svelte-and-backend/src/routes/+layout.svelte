<script>
    import '../app.css'
    import Navbar from "../components/base/Navbar.svelte"
    import Footer from "../components/base/Footer.svelte"

    let {children} = $props()
</script>

<div class="app ">
    <Navbar></Navbar>
    <main class="min-h-[100vh] bg-white  dark:bg-gray-900">
        {@render children()}
    </main>


    <Footer></Footer>
</div>

<style>
</style>
