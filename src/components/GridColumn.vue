<script setup lang="ts">
import { computed, type Ref } from 'vue';
import GridCell from './GridCell.vue';
import { ConnectFour } from '../models/connect-four';

const emit = defineEmits(['column-clicked']);
const props = defineProps<{ columnIndex: number, columnRows: Ref<number>[], turnPlayer: number }>();
const turnColor = computed(() => {
    if (props.turnPlayer === ConnectFour.YELLOW_ID) return "yellow";
    if (props.turnPlayer === ConnectFour.RED_ID) return "red";
    return "";
});

const onClicked = () => {
    emit('column-clicked', props.columnIndex);
}
</script>

<template>
    <div class="column" :class="turnColor" @click="onClicked">
        <GridCell v-for="row of columnRows" :id="'cell' + columnIndex + row" :playerId="row" />
    </div>
</template>

<style scoped>
.column {
    align-self: center;
    display: flex;
    flex-direction: column;
    transition: filter 500ms;
    position: relative;
    z-index: 2;
}

.column:hover {
    z-index: 10;
    transition: filter 50ms;
}

.red:hover {
    filter: drop-shadow(0 0 0.5em red);
}

.yellow:hover {
    filter: drop-shadow(0 0 0.5em yellow);
}
</style>