<template>
    <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh;width: 100vw;">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.container-fluid {
    backface-visibility: hidden;
    display: block;
    flex-direction: column;
    flex: 1 1 auto;
    max-width: 100%;
    min-height: 100vh;
    position: relative;
}
</style>