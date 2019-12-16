import * as React from 'react';
import { Button } from 'react-bootstrap';
import Board from './Board';
import Flash from './Flash';
import Grid from './Grid';

export interface IProps {
    columns: number;
    onScoreChange?: (prevScore: number, nextScore: number) => void;
    onGameTimeUpdate?: (currentTime: number, totalTime: number) => void;
    onGameEnded?: (score: number) => void;
    rows: number;
    running: boolean;
    gameSpeed: number;
}

export interface IState {
    board: Board;
    currentFlash?: Flash;
}

class Game extends React.Component<IProps, IState> {
    public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const nextState: any = { board: prevState.board };

        if (prevState.board.rows !== nextProps.rows || prevState.board.columns !== nextProps.columns || prevState.board.gameSpeed !== nextProps.gameSpeed) {
            prevState.board.stop();
            nextState.board = new Board(nextProps.rows, nextProps.columns, nextProps.gameSpeed);
            nextState.running = false;
        }

        if (nextProps.onScoreChange) {
            nextState.board.onScoreChange = nextProps.onScoreChange;
        }

        if (nextProps.onGameTimeUpdate) {
            nextState.board.onGameTimeUpdate = nextProps.onGameTimeUpdate;
        }

        if (nextProps.onGameEnded) {
            nextState.board.onGameEnded = nextProps.onGameEnded;
        }

        if (nextProps.running) {
            nextState.running = true;
        }        

        return nextState;
    }

    constructor(props: any) {
        super(props);

        // console.log("Please");
        // console.log(this.props.gameSpeed);
        this.state = {
            board: new Board(this.props.rows, this.props.columns, this.props.gameSpeed),
            currentFlash: undefined,
        }

        this.tryPosition = this.tryPosition.bind(this);
        this.trySound = this.trySound.bind(this);
        this.tryBoth = this.tryBoth.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onFlash = this.onFlash.bind(this);
        this.speak = this.speak.bind(this);

        window.addEventListener('keydown', this.handleClick);
    }

    public componentWillUnmount() {
        this.state.board.stop();
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState, snapshot?: any) {
        if (!prevProps.running && this.props.running) {
            this.state.board.start(this.onFlash);
        }

        if (prevProps.running && !this.props.running) {
            this.state.board.stop();
        }
    }

    public render() {
        const props: any = {};
        if (this.state.currentFlash) {
            props.highlight = this.state.currentFlash.position;
        }
        return (
            <div>
                <Grid rows={this.state.board.rows} columns={this.state.board.columns} {...props} />
                <Button color="secondary" disabled={!this.props.running} onClick={this.tryPosition}>Position (Q)</Button>
                <Button color="secondary" disabled={!this.props.running} onClick={this.trySound}>Sound (W)</Button>
                <Button color="secondary" disabled={!this.props.running} onClick={this.tryBoth}>Both (E)</Button>
            </div>
        );
    }

    private tryPosition() {
        this.state.board.samePosition();
    }

    private trySound() {
        this.state.board.sameSound();
    }

    private tryBoth() {
        this.state.board.sameSound();
        this.state.board.samePosition();
    }

    private handleClick(event: KeyboardEvent) {
        if (event.key === 'q' || event.key === 'Q') {
            this.state.board.samePosition();
        }
        if (event.key === 'w' || event.key === 'W') {
            this.state.board.sameSound();
        }
        if (event.key === 'e' || event.key === 'E') {
            this.state.board.sameSound();
            this.state.board.samePosition();
        }
      }

    private onFlash(newFlash: Flash) {
        this.setState({ currentFlash: newFlash });
        this.speak(newFlash.sound.toString());
    }

    private speak(text: string) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.lang = "en-EN";
            if (this.props.gameSpeed < 2) {
                utterance.rate = this.props.gameSpeed;
            } else {
                utterance.rate = this.props.gameSpeed * 2;
            }
            utterance.voice = speechSynthesis.getVoices().filter((voice) => {
                return voice.name === "Alex";
            })[0];
            window.speechSynthesis.speak(utterance);
        }
    }
}

export default Game;