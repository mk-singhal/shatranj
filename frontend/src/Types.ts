export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: TagType;
};

export type BlogType = {
  id: number;
  image: string;
  title: string;
  tag: TagType;
  content: string;
  user: UserType;
  createdAt: string;
};

export type TagType = {
  id: number;
  name: string;
  user: UserType;
};

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

export type AlertHTML = {
  severity: any;
  message: string;
};