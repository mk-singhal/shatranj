import { Piece, Position } from "../../models";
import {
  tileIsOccupied,
  tileIsOccupiedByOpponent,
  positionOutOfBoard,
} from "./GeneralRules";

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]) => {
  const possibleMoves: Position[] = [];
  // Upper-right Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(
      bishop.position.x + i,
      bishop.position.y + i
    );

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, bishop.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Lower-right Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(
      bishop.position.x + i,
      bishop.position.y - i
    );

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, bishop.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Lower-left Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(
      bishop.position.x - i,
      bishop.position.y - i
    );

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, bishop.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Upper-left Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(
      bishop.position.x - i,
      bishop.position.y + i
    );

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, bishop.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
