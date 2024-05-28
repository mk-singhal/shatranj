import { TeamType } from "../../Types";
import { Position, Piece, Pawn } from "../../models";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]) => {
  const possibleMoves: Position[] = [];

  const specialRow = pawn.team === TeamType.OUR ? 1 : 6;
  const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;

  const normalMove = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection
  );
  const specialMove = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection * 2
  );
  const upperLeftAttack = new Position(
    pawn.position.x - 1,
    pawn.position.y + pawnDirection
  );
  const upperRightAttack = new Position(
    pawn.position.x + 1,
    pawn.position.y + pawnDirection
  );
  const enPassantLeftPosition = new Position(
    pawn.position.x - 1,
    pawn.position.y
  );
  const enPassantRightPosition = new Position(
    pawn.position.x + 1,
    pawn.position.y
  );

  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);

    if (
      pawn.position.y === specialRow &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }
  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) =>
      enPassantLeftPosition.samePosition(p.position)
    );
    if (
      leftPiece !== undefined &&
      leftPiece.isPawn &&
      (leftPiece as Pawn).enPassant
    ) {
      possibleMoves.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) =>
      enPassantRightPosition.samePosition(p.position)
    );
    if (
      rightPiece !== undefined &&
      rightPiece.isPawn &&
      (rightPiece as Pawn).enPassant
    ) {
      possibleMoves.push(upperRightAttack);
    }
  }

  return possibleMoves;
};
