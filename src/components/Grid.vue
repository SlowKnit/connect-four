<script setup lang="ts">
import { ref } from 'vue';
import { ConnectFour } from '../models/connect-four'
import GridColumn from './GridColumn.vue';
import TurnIndicator from './TurnIndicator.vue';


const game: ConnectFour = new ConnectFour();
const trackedBoard = game.board.map((column) =>
    column.map((cell) => ref(cell))
);
const isGameOver = ref(false);
const winner = ref("");
const trackedTurnPlayer = ref(game.turnPlayerId);

const onColumnClicked = (col: number) => {
    if (isGameOver.value) return;
    game.dropStone(col);
};

const onWin = (player: number) => {
    isGameOver.value = true;
    let winColor: string;
    if (player === ConnectFour.RED_ID) winColor = "red";
    else winColor = "yellow";
    winner.value = winColor + "Winner"
}

const reset = () => {
    winner.value = "";
    isGameOver.value = false;
    game.clear()
}

game.onCellChanged = (col, row, newVal) => {
    trackedBoard[col][row].value = newVal;
}
game.onPlayerChanged = (turnPlayer) => { trackedTurnPlayer.value = turnPlayer };
game.onWin = onWin;
reset();
</script>

<template>
    <TurnIndicator :is-game-over="isGameOver" :turn-player-id="trackedTurnPlayer">
    </TurnIndicator>
    <button class="reset" @click="reset">Reset</button>
    <div class="board" :class="winner">
        <GridColumn v-for="colIndex in game.columns" :key="'column' + colIndex" :column-index="colIndex - 1"
            :column-rows="trackedBoard[colIndex - 1]" :turn-player="trackedTurnPlayer"
            @column-clicked="onColumnClicked" />
    </div>
</template>

<style>
.board {
    transition: filter 500ms;
    margin: auto;
    padding: 9px 9px;
    display: grid;
    grid-template-columns: repeat(7, 108px);
    background-color: rgb(64, 64, 255);
    border-radius: 12px;
}

.reset {
        background-color: rgb(64, 64, 255);
    text-align: center;
    position: absolute;
    height: 300px;
    width: 300px;
    top: 280px;
    left: 60px;
    z-index: 10;
    padding: 10px 10px;
    border-radius: 60%;
    transition: all 600ms;
    font-size: 80px;
    text-shadow: #000 0px 0px 6px;
    -webkit-font-smoothing: antialiased;

}

.reset:hover {
    border-radius: 20%;
    scale: 104%;
    filter: drop-shadow(0 0 0.15em rgb(64, 64, 255));
    background-color: rgb(64, 64, 205);
}

.reset:active {
    transition: all 600ms;
    border-radius: 10%;
    scale: 106%;
    filter: drop-shadow(0 0 0.15em rgb(164, 164, 255));
    background-color: rgb(0, 0, 55);
}

.redWinner {
    filter: drop-shadow(0 0 3em red);
}

.yellowWinner {
    filter: drop-shadow(0 0 3em yellow);
}
</style>