import {NextRequest,NextResponse} from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { CreateCommentDto } from '@/utils/dtos';
import { CreateCommentSchema } from '@/utils/validationSchemas';

/**
 * @method POST
 * @route ~/api/comments
 * @description Create New Comment
 * @access private ( only admin can create)
 */

export async function POST(request: NextRequest){
  try {
    const user = verifyToken(request);
    if(!user){
      return NextResponse.json(
        {message:"only logged in user, accesss denied"},
        {status:401}
      )
    };
    const body = await request.json() as CreateCommentDto;

    const validation = CreateCommentSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json({message: validation.error.errors[0].message})
    }

    const newComment = await prisma.comment.create({
      data:{
        text:body.text,
        articleId:body.articleId,
        userId:user.id
      }
    });

    return NextResponse.json(newComment,{status:201})

    
  } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})

  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description get all comments
 * @access private (only admin)
 */
export async function GET(request: NextRequest){
  try {
    const user = verifyToken(request);
    if(user=== null || user.isAdmin===false){
      return NextResponse.json(
        {message: "only admin, access denied"},
        {status:403}  
      )
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments,{status:200})
    
  } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})

  }
}
