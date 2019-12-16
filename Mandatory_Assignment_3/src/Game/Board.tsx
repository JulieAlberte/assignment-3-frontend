import * as _ from "lodash";
import Flash from "./Flash";

class Board {

    public onScoreChange?: (prevScore: number, nextScore: number) => void;
    public onGameTimeUpdate?: (currentTime: number, totalTime: number) => void;
    public onGameEnded?: (score: number) => void;

    private timerToken?: number;
    private gameTimerToken?: number;
    private onFlash?: (flash: Flash) => void;
    private readonly history: Flash[];
    private score: number;
    private time: number;
    private totalTime: number;
    private currentTime: number;
    private hasClickedPosition: boolean;
    private hasClickedSound: boolean;

    constructor(
        public readonly rows: number,
        public readonly columns: number,
        public readonly gameSpeed: number,
    ) {
        this.history = [];
        this.score = 0;
        this.time = (2500 / this.gameSpeed);
        this.totalTime = 60;
        this.currentTime = this.totalTime;
        this.hasClickedPosition = false;
        this.hasClickedSound = false;
    }

    public start(onFlash: (flash: Flash) => void) {
        this.onFlash = onFlash;

        // window.setTimeout(() => {
        //     onFlash(this.next());
        // }, 10000);
        this.gameTimerToken = window.setInterval(() => this.onUpdateTimeLeft(), 1000)
        this.timerToken = window.setInterval(() => onFlash(this.next()), this.time);
    }

    public stop() {
        clearInterval(this.timerToken);
        clearInterval(this.gameTimerToken);
        // clearInterval(this.gameTimerVisualToken);
        delete this.onFlash;
        delete this.timerToken;
        delete this.gameTimerToken;
        // delete this.gameTimerVisualToken;
    }

    public samePosition() {
        if (!this.hasClickedPosition) {
            this.hasClickedPosition = true;
            if (this.history.length > 1 && _.isEqual(this.history[this.history.length - 1].position, this.history[this.history.length - 2].position)) {
                this.updateScore(100);
            } else {
                this.updateScore(-100);
            }
        }
    }

    public sameSound() {
        if (!this.hasClickedSound) {
            this.hasClickedSound = true;
            if (this.history.length > 1 && _.isEqual(this.history[this.history.length - 1].sound, this.history[this.history.length - 2].sound)) {
                this.updateScore(100);
            } else {
                this.updateScore(-100);
            }
        }
    }

    private next() {
        const p: number = 15;
        const nextFlash: any = {};

        if (this.history.length > 0 && this.randomInRange(1, 100) <= p) {
            nextFlash.position = this.history[this.history.length - 1].position;
        } else {
            const randomRow = this.randomInRange(0, this.rows - 1);
            const randomColumn = this.randomInRange(0, this.columns - 1);
            nextFlash.position = [randomRow, randomColumn];
        }

        if (this.history.length > 0 && this.randomInRange(1, 100) <= p) {
            nextFlash.sound = this.history[this.history.length - 1].sound;
        } else {
            const randomSound = this.randomInRange(1, 9);
            nextFlash.sound = randomSound;
        }

        this.history.push(nextFlash);
        this.hasClickedPosition = false;
        this.hasClickedSound = false;
        return nextFlash;
    }

    private updateScore(delta: number) {
        const newScore: number = this.score + delta;
        if (this.onScoreChange) {
            this.onScoreChange(this.score, newScore);
        }
        this.score = newScore;
    }

    private randomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private onGameEndedFunction() {
        if (this.onGameEnded) {
            this.onGameEnded(this.score);
        }
        this.stop();
    }

    private onUpdateTimeLeft() {
        this.currentTime--;
        if (this.onGameTimeUpdate) {
            this.onGameTimeUpdate(this.currentTime, this.totalTime)
        }
        if (this.currentTime <= 0) {
            this.onGameEndedFunction();
        }
    }
}

export default Board;
