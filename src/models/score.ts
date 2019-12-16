export class Score {
    username: String;
    score: number;
    rank: number | undefined;
    constructor(username: String, score: number ){
        this.username = username;
        this.score = score;
    }
}