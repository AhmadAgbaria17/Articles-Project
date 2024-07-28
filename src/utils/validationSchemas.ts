import {z} from "zod"



export const createArticleSchema = z.object({
  title: z.string({
    required_error:"title is required",
    invalid_type_error:"title should be of type string"
  }).min(2,{message:"title must be more than two characters,thanks"}).max(200),

  description: z.string({
    required_error:"description is required",
    invalid_type_error:"title should be of type string"
  }).min(10).max(2000),
}) 


export const createUserSchema = z.object({
  username : z.string().min(4).max(100),
  email : z.string().min(2).max(50,{message:"email max 50"}).email({message:"invalid email"}),
  password : z.string().min(6).max(100),
  
})