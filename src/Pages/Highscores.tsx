import React from "react";
import { Table } from 'react-bootstrap';
import { Score } from "../models/score";

export interface IProps {
  scores: Score[];
}

export class Highscores extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Username</th>
            </tr>
          </thead>
          {this.props.scores.map((score, i)=> (
            <tbody  key={i}>
              <tr>
                <td>{score.rank}</td>
                <td>{score.score}</td>
                <td>{score.username}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}