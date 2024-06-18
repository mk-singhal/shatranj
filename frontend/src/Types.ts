export type UserProfileType = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
};

export enum PieceType {
  PAWN = "pawn",
  BISHOP = "bishop",
  KNIGHT = "knight",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export enum TeamType {
  OPPONENT = "b",
  OUR = "w",
}
