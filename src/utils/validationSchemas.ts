import {z} from "zod"



export const createArticleScheam = z.object({
  title: z.string().min(2,"title must be more than two characters,thanks").max(200),
  body: z.string().min(10).max(2000),
}) 