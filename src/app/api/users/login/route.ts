import { LoginUserDto } from '@/utils/dtos';
import { loginUserSchema } from '@/utils/validationSchemas';
import {NextResponse, NextRequest} from 'next/server';
import prisma from '@/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';
import { JWTPayload } from '@/utils/types';








/**
 * @method POST
 * @route ~/api/users/login
 * @description Login User
 * @access public
 */

export async function POST(request:NextRequest){
  try {
    const body = await request.json() as LoginUserDto;

    const validation = loginUserSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json({message:validation.error.errors[0].message},{status:400})
    }

    const user = await prisma.user.findUnique({where:{email:body.email}});

    // check user existed 
    if(!user){
      return NextResponse.json({message:'Invalid email or password'}, {status:404})
    }

    //check password
    const checkPassword = await bcrypt.compare(body.password,user.password);
    if(!checkPassword){
      return NextResponse.json({message:'Invalid email or password'}, {status:401})
    }


    const cookie = setCookie({
      id:user.id,
      email:user.email,
      isAdmin:user.isAdmin,
      username:user.username
    });

    return NextResponse.json(
      {message:'User logged in successfully'},
      {
        status:200,
        headers:{"Set-Cookie":cookie}
      }
    )

    
  } catch (error) {
    return NextResponse.json(
      {message:"internal server error"},
      {status:500});
  }
}