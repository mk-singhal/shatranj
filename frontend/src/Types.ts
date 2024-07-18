export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type BlogType = {
  id: number;
  slug: string;
  image: string;
  title: string;
  tag: TagType;
  content: string;
  user: UserType;
  views: number;
  likes: number;
  createdAt: string;
};

export type TagType = {
  id: number;
  name: string;
  user: UserType;
};

export type UserProfileType = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
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