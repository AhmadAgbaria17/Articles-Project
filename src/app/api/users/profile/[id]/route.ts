import {NextResponse,NextRequest} from 'next/server';
import prisma from '@/utils/db';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/utils/types';
import { verifyToken } from '@/utils/verifyToken';


interface Props{
  params:{ id : string}
}



/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description Delete profile
 * @access private 
 */


export async function DELETE(request: NextRequest, { params }:Props){
  try {
    
    const user = await prisma.user.findUnique({where: { id : parseInt(params.id)}});
    if(!user) return NextResponse.json({message:"user not found"},{status:404});


    const userfromToken = verifyToken(request)
    if(userfromToken!== null && userfromToken.id === user.id){
      await prisma.user.delete({where:{id : parseInt(params.id)}});
      return NextResponse.json({message:"your profile has been deleted"},{status:200});
    }

    return NextResponse.json({message:'only user himself can delete his profile, forbidden'},{status:403})

    

  } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})
  }
} 