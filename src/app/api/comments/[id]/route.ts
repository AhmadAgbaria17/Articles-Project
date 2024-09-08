import {NextRequest,NextResponse} from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { UpdateCommentDto } from '@/utils/dtos';

interface Props{
  params:{ id : string}
}


/**
 * @method PUT
 * @route ~/api/comments/:id
 * @description Update comment
 * @access private (owner of comment)
 */
export async function PUT(request:NextRequest, {params}:Props){
  try {
    const comment = await prisma.comment.findUnique({where: { id : parseInt(params.id)}});
    if(!comment) return NextResponse.json({message:"comment not found"},{status:404});

    const userfromToken = verifyToken(request);
    if(userfromToken === null || userfromToken.id !== comment.userId){
      return NextResponse.json({message:"you are not allowed, access denied"},{status:403});
    }

    const body = await request.json() as UpdateCommentDto;
    const updatedComment = await prisma.comment.update({
      where:{id:parseInt(params.id)},
      data:{text:body.text}
    });

    return NextResponse.json(updatedComment,{status:200})
    
  } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})
  }
}


/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @description Delete Comment
 * @access private (only admin or user himself)
 */

export async function DELETE(request: NextRequest, { params }:Props){
  try {
    
    const comment = await prisma.comment.findUnique({where: { id : parseInt(params.id)}});
    if(!comment) return NextResponse.json({message:"comment not found"},{status:404});


    const userfromToken = verifyToken(request)
    if(userfromToken === null ){
      return NextResponse.json({message:"no token provided, access denied"},{status:401});
    }

    if(userfromToken.isAdmin || userfromToken.id === comment.userId){
      await prisma.comment.delete({where:{id:parseInt(params.id)}});
      return NextResponse.json({message:"Comment Deleted"},{status:200})
    }

    return NextResponse.json({message:"you are not allowed, access denied"},{status:401});


  } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})
  }
} 
