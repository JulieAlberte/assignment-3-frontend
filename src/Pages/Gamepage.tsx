import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Game from "../Game/Game";
import { Score } from "../models/score";
import { Redirect } from "react-router-dom";
var jwt_decode = require('jwt-decode');

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
  gameSpeed: number;
  currentTime: number;
  totalTime: number;
  websocket: WebSocket
  redirect: boolean;
}

export interface IProps {
  websocket: WebSocket
}


export class Gamepage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
      gameSpeed: 1,
      currentTime: 0,
      totalTime: 0,
      websocket: props.websocket,
      redirect: false
    };

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.setGameSpeed = this.setGameSpeed.bind(this);
    this.onGameTimeUpdate = this.onGameTimeUpdate.bind(this);
    this.onGameEnded = this.onGameEnded.bind(this);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/highscores' />;
    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col xs="3">
                <h4>Grid Size: {this.state.gridSize}</h4>
                <input type="range" min="3" max="5" className="slider" value={this.state.gridSize}
                  onInput={this.setGridSize} onChange={this.setGridSize} />
                <h4>Game Speed: {this.state.gameSpeed}</h4>
                <input type="range" min="0.5" max="4" step="0.5" className="slider" value={this.state.gameSpeed}
                  onInput={this.setGameSpeed} onChange={this.setGameSpeed} />
                <h4><br /><br />Time Left: {this.state.currentTime} : {this.state.totalTime}</h4>
              </Col>
              <Col xs="6">
                <Game gameSpeed={this.state.gameSpeed} rows={this.state.gridSize} columns={this.state.gridSize}
                  running={this.state.gameRunning} onScoreChange={this.onScoreChange} onGameTimeUpdate={this.onGameTimeUpdate}
                  onGameEnded={this.onGameEnded} />
              </Col>
              <Col xs="3">
                <Row>
                  <Col xs="12">
                    <Button color="primary" className={this.state.gameRunning ? 'hidden' : ''} onClick={this.onPlay}>Play</Button>
                    <Button color="primary" className={!this.state.gameRunning ? 'hidden' : ''} onClick={this.onPause}>Pause</Button>
                  </Col>
                </Row>
                <Row>
                  <p>{this.state.score}</p>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }

  private setGridSize(e: any) {
    this.setState({ gridSize: e.target.value });
  }

  private setGameSpeed(e: any) {
    this.setState({ gameSpeed: e.target.value });
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
  }

  private onPause(e: any) {
    this.setState({ gameRunning: false });
  }

  private onScoreChange(prevScore: number, nextScore: number) {
    this.setState({ score: nextScore });
  }

  private onGameTimeUpdate(currentTime: number, totalTime: number) {
    this.setState({ currentTime: currentTime, totalTime: totalTime });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  private onGameEnded(score: number) {
    var jwt = localStorage.getItem('authToken');
    if (jwt !== null) {
      var jwtDecoded = this.getDecodedAccessToken(jwt);
      var newScore = new Score(jwtDecoded.username, score);
      fetch(`${process.env.REACT_APP_API_URL}/api/score/add`, {
        method: 'POST',
        body: JSON.stringify(newScore),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()).then((resJson) => {
        if (resJson.status === 200) {
          this.state.websocket.send("Update highscores");
          this.setState({ ...this.state, redirect: true });
        } else {
          console.log("An error occurred, please try again");
        }
      });
    }
  }
}