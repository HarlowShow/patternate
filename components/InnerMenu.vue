<template>
    <div class="inner-menu p-md">
        <div class="icon-holder">
            <slot></slot>   
        </div>
    </div>
</template>

<style lang="scss">
    .inner-menu {
        background-color: white;
        border-radius: 15px;
        padding: $xs;
        margin: $xs;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        max-height: 100vh;
        max-width: 100vw;
        height: max-content;
    }

    .icon-holder {
        display: flex;
        // justify-content: space-evenly;
    }

    .icon {
        padding: $xs;
    }
</style>