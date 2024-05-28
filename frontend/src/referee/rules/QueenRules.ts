import { Piece } from "../../models";
import { getPossibleBishopMoves } from "./BishopRules";
import { getPossibleRookMoves } from "./RookRules";

export const getPossibleQueenMoves = (queen: Piece, boardState: Piece[]) => {
  return getPossibleRookMoves(queen, boardState).concat(
    getPossibleBishopMoves(queen, boardState)
  );
};
