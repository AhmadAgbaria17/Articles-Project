import { getSingleArticle } from '@/apiCalls/articleApiCall';
import AddCommentForm from '@/components/comments/AddCommentForm';
import CommentItem from '@/components/comments/CommentItem';
import { SingleArticle } from '@/utils/types';
import React from 'react';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import Link from 'next/link';


interface SingleArticleProps{
  params : {id:string}
}

const SingleArticlePage = async ({params}:SingleArticleProps) => {

  const article : SingleArticle = await getSingleArticle(params.id);
  const token = cookies().get("jwtToken")?.value|| "";
  const userPayload = verifyTokenForPage(token);


  return (
    <section className='fix-height container m-auto w-full px-5 pt-8 md:w-3/4'>
      <div className='bg-white p-7 rounded-lg mb-7' >
        <h1 className='text-3xl font-bold text-gray-700 mb-2'>{article.title}</h1>
        <div className='text-gray-400'>{new Date (article.createdAt).toDateString()}</div>
        <hr className='mt-2'/>
        <p className='text-gray-800 text-xl mt-5'>{article.description}</p>
      </div>

    
      {userPayload?<AddCommentForm articleId={article.id}/>:
      (
        <p className='bg-red-700  p-5 flex justify-center text-white '>
          to Write a comment you should <Link className='px-1 text-purple-300' href='/login'>Login</Link> first..
        </p>
      )}
      
      <h4 className='text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7 md:text-xl'>
        Comments
      </h4>
      {article.comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} userId={userPayload?.id} />
      ))}
      
    </section>
  )
}

export default SingleArticlePage
