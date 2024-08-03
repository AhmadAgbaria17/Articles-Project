import prisma from '@/utils/db';
import { RegisterUserDto } from '@/utils/dtos';
import { createUserSchema } from '@/utils/validationSchemas';
import {NextResponse, NextRequest} from 'next/server';
import bcrypt from 'bcryptjs'
import { setCookie } from '@/utils/generateToken';


/**
 * @method POST
 * @route ~/api/users/register
 * @description Get New User
 * @access public
 */

export async function POST(request:NextRequest) {

  try {
    const body = await request.json() as RegisterUserDto;

    const validation = createUserSchema.safeParse(body);

    if(!validation.success){
      return NextResponse.json({message: validation.error.errors[0].message},{status:400})
    }

    const user = await prisma.user.findUnique({where: {email: body.email}});
    if(user){
      return NextResponse.json({message: 'Email already exists'}, {status: 400})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password,salt)

    const newUser = await prisma.user.create({
      data:{
        username: body.username,
        email:body.email,
        password:hashedPassword
      },
      select:{
        id:true,
        username:true,
        isAdmin:true,
        email:true
      }
    })

    

    const cookie = setCookie({
      id:newUser.id,
      email: newUser.email,
      isAdmin:newUser.isAdmin,
      username:newUser.username
    });



    return NextResponse.json({...newUser, message:"Registered & Authenticated"},
      {
      status:201,
      headers:{
        "Set-Cookie": cookie
      }
    });

    
  } catch (error) {
    return NextResponse.json(
      {message:"internal server error"},
      {status:500}
    )
  }
  
}