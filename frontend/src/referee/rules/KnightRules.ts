import { Position, Piece } from "../../models";
import {
  positionOutOfBoard,
  tileIsEmptyOrOccupiedByOpponent,
} from "./GeneralRules";

export const getPossibleKnightMoves = (knight: Piece, boardState: Piece[]) => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      if (
        tileIsEmptyOrOccupiedByOpponent(
          new Position(knight.position.x + 1 * i, knight.position.y + 2 * j),
          boardState,
          knight.team
        ) &&
        !positionOutOfBoard(
          new Position(knight.position.x + 1 * i, knight.position.y + 2 * j)
        )
      ) {
        possibleMoves.push(
          new Position(knight.position.x + 1 * i, knight.position.y + 2 * j)
        );
      }
      if (
        tileIsEmptyOrOccupiedByOpponent(
          new Position(knight.position.x + 2 * i, knight.position.y + 1 * j),
          boardState,
          knight.team
        ) &&
        !positionOutOfBoard(
          new Position(knight.position.x + 2 * i, knight.position.y + 1 * j)
        )
      ) {
        possibleMoves.push(
          new Position(knight.position.x + 2 * i, knight.position.y + 1 * j)
        );
      }
    }
  }

  return possibleMoves;
};
