<script setup lang="ts">
import { computed } from 'vue';
import { ConnectFour } from '../models/connect-four';

const props = defineProps<{ isGameOver: boolean, turnPlayerId: number; }>();
const turnPlayerName = computed(() => {
    return props.turnPlayerId === ConnectFour.YELLOW_ID ? "Yellow" : "Red";
});
</script>

<template>
    <p v-if="!isGameOver" class="turn-indicator" :class="turnPlayerName">
        <strong>{{ turnPlayerName }}</strong>
        's turn
    </p>
    <p v-else class="turn-indicator" :class="turnPlayerName">
        <strong>{{ turnPlayerName }}</strong>&nbsp;has won!
    </p>
</template>

<style>
.turn-indicator {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 3rem;
    z-index: 10;
    text-shadow: #000 0px 0px 6px;
    -webkit-font-smoothing: antialiased;
    transition: all 0.3s ease;
}

.Red {
    background-color: red;
}

.Yellow {
    background-color: gold;
}
</style>