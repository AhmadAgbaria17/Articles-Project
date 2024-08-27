import React from 'react'
import { cookies } from 'next/headers';
import {redirect} from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';

const AdminArticleTable = () => {

  const token = cookies().get("jwtToken")?.value;
  if(!token) redirect("/");

  const userpayload = verifyTokenForPage(token);
  if(!userpayload?.isAdmin || !token ) redirect('/')


  return (
    <div>
      article page
    </div>
  )
}

export default AdminArticleTable
