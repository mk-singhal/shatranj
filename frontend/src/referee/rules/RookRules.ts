import { Piece, Position } from "../../models";
import {
  tileIsOccupied,
  tileIsOccupiedByOpponent,
  positionOutOfBoard,
} from "./GeneralRules";

export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]) => {
  const possibleMoves: Position[] = [];
  // Right Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(rook.position.x + i, rook.position.y);

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, rook.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Lower Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(rook.position.x, rook.position.y - i);

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, rook.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Left Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(rook.position.x - i, rook.position.y);

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, rook.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }
  // Upper Movement
  for (let i = 1; i < 8; i++) {
    const tmpPosition = new Position(rook.position.x, rook.position.y + i);

    if (positionOutOfBoard(tmpPosition)) break;

    if (!tileIsOccupied(tmpPosition, boardState)) {
      possibleMoves.push(tmpPosition);
    } else if (tileIsOccupiedByOpponent(tmpPosition, boardState, rook.team)) {
      possibleMoves.push(tmpPosition);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
