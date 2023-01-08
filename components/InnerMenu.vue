<template>
    <div class="inner-menu p-md">
        <div class="icon-holder">
            <slot></slot>   
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .inner-menu {
        background-color: white;
        border-radius: 20px;
        padding: $xs;
        max-width: 100vw;
        width: 300px;
    }

    .icon-holder {
        display: flex;
        justify-content: space-evenly;
    }
</style>