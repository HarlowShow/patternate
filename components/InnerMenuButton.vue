<template>
    <button>
        <slot></slot>
    </button>
    <div class="spacer"></div>
    </template>
    
    <style lang="scss" scoped>
    .spacer {
        min-width: 0.5rem;
    }
    button {
        display: inline-block;
        border: none;
        padding: 1rem 1rem;
        margin: 0;
        text-decoration: none;
        background: mediumslateblue;
        color: #ffffff;
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        max-width: 80%;
        // border-radius: 8px;
        // -webkit-appearance: none;
        // -moz-appearance: none;
    }
    
    button:hover,
    button:focus, button.active {
        background: #4A3ECC;
    }
    
    button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }
    
    button:active {
        transform: scale(0.99);
    }
    </style>