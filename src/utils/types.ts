export type Article ={
  id:number;
  userId:number;
  title:string;
  body:string;
}



export type JWTPayload ={
  id : number;
  email : string;
  isAdmin:boolean;
  username:string;
}
