<script setup lang="ts">
import { computed,type Ref } from 'vue';
import { ConnectFour } from '../models/connect-four';

const props = defineProps<{ playerId: Ref<number> }>();
const playerColor = computed(() => {
    if (props.playerId.value === ConnectFour.YELLOW_ID) return "yellowCell";
    if (props.playerId.value === ConnectFour.RED_ID) return "redCell";
    return "";
});
</script>

<template>
    <div class="gridCell" :class="playerColor">
    </div>
</template>

<style scoped>
.gridCell {
    align-self: center;
    margin-top: 9px;
    margin-bottom: 9px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #333;
    transition: all 0.5s;
}

.redCell {
    background-color: red;
}

.yellowCell {
    background-color: yellow;
}
</style>