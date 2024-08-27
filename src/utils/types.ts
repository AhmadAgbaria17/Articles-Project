import { Article,Comment,User } from "@prisma/client";


export type CommentWithUser = Comment & {user:User};

export type SingleArticle = Article & {comments : CommentWithUser[] };

export type JWTPayload ={
  id : number;
  email : string;
  isAdmin:boolean;
  username:string;
}


