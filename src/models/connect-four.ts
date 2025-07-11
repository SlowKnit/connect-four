type PlayerChangedCallback = (turnPlayer: number) => void;
type CellChangedCallback = (col: number, row: number, playerId: number) => void;
type WinCallback = (winner: number) => void;

export class ConnectFour {
    public static readonly WIN_LENGTH = 4
    public static readonly NOT_SET = -1
    public static readonly YELLOW_ID = 0;
    public static readonly RED_ID = 1;

    public readonly rows: number;
    public readonly columns: number;
    public readonly board: number[][]

    private turnPlayer: number = 0;
    public get turnPlayerId(): number { return this.turnPlayer; };

    public onPlayerChanged?: PlayerChangedCallback;
    public onCellChanged?: CellChangedCallback;
    public onWin?: WinCallback;

    constructor(rows: number = 6, columns: number = 7) {
        this.rows = rows;
        this.columns = columns;
        this.board = Array.from({ length: columns }, () =>
            Array(rows).fill(-1));
    }

    private getLowestUnplayedRow(col: number): number {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[col][row] === ConnectFour.NOT_SET) return row;
        }
        return -1;
    }

    private setCell(col: number, row: number, newVal: number): void {
        this.board[col][row] = newVal;
        this.onCellChanged?.(col, row, newVal);
    }

    public readonly clear = () => {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.setCell(col, row, ConnectFour.NOT_SET);
            }
        }
        this.turnPlayer = 0;
        this.onPlayerChanged?.(this.turnPlayer)
    };


    public readonly dropStone = (column: number) => {
        if (column < 0 || column >= this.columns) {
            return false;
        }
        const lowestRow: number = this.getLowestUnplayedRow(column);
        if (lowestRow === ConnectFour.NOT_SET) {
            return false;
        }
        this.setCell(column, lowestRow, this.turnPlayer);
        const winner: number = this.checkWin();
        if (winner !== ConnectFour.NOT_SET) {
            this.onWin?.(winner);
        }
        else {
            this.turnPlayer = (this.turnPlayer + 1) % 2;
            this.onPlayerChanged?.(this.turnPlayer)
        }

        return true;
    }

    public readonly checkWin = (): number => {
        const directions = [
            [1, 0],   // horizontal
            [0, 1],   // vertical
            [1, 1],   // diagonal r-down
            [-1, 1]   // diagonal l-down
        ];

        for (let col = 0; col < this.columns; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.board[col][row] === ConnectFour.NOT_SET) continue;

                for (const [dx, dy] of directions) {
                    let winner = this.checkDirection(col, row, dx, dy);
                    if (winner !== ConnectFour.NOT_SET) return winner;
                }
            }
        }

        return -1;
    };

    private checkDirection(startCol: number, startRow: number, deltaX: number, deltaY: number): number {
        const player = this.board[startCol][startRow];

        for (let i = 1; i < ConnectFour.WIN_LENGTH; i++) {
            const col = startCol + deltaX * i;
            const row = startRow + deltaY * i;

            // out of bounds Check
            if (
                col < 0 || col >= this.columns ||
                row < 0 || row >= this.rows
            ) {
                return -1;
            }

            if (this.board[col][row] !== player) {
                return -1;
            }
        }

        return player;
    };

}