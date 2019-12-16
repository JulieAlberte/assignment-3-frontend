import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Frontpage } from './Pages/Frontpage';
import { Header } from './Components/Header';
import { Highscores } from './Pages/Highscores';
import { SignUp } from './Pages/SignUp';
import { SignIn } from './Pages/SignIn';
import { Gamepage } from './Pages/Gamepage'
import PrivateRoute from './private';
import Logout from './Components/Logout';
import { Score } from './models/score';

export interface IState {
    scores: Score[];
}

export class Routing extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            scores: []
        };
    }
    ws = new WebSocket('ws://assignment-3-backend.herokuapp.com/');

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
            this.ws.send('Connected');
        };

        this.ws.onmessage = evt => {
            var sortedScores = this.sortByRank(JSON.parse(evt.data));
            this.setState({ ...this.state, scores: sortedScores });
        };

        this.ws.onclose = () => {
            console.log('disconnected');
        };
    }

    private sortByRank(scores: Score[]): Score[] {
        scores.sort((n1, n2) => n2.score - n1.score);
        var count = 0;
        scores.forEach(score => {
          count++;
          score.rank = count;
        });
        return scores;
      }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/frontpage">
                            <Frontpage />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <PrivateRoute component={Highscores} scores={this.state.scores} websocket={this.ws} path="/highscores"></PrivateRoute>
                        <PrivateRoute component={Gamepage} websocket={this.ws} path="/game"></PrivateRoute>
                        <Route path="/sign-out">
                            <Logout></Logout>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
