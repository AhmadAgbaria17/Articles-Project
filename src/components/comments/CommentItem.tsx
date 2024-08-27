"use client"
import { CommentWithUser } from '@/utils/types'
import {FaEdit , FaTrash} from 'react-icons/fa'
import UpdateCommentModal from './UpdateCommentModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DOMAIN } from '@/utils/constant';

interface CommentItemProps{
  comment: CommentWithUser;
  userId : number| undefined;
}


const CommentItem = ({comment , userId}: CommentItemProps) => {


  const [updateModalShow , setUpdateModalShow] = useState(false);
  const router = useRouter();


  const commentDeleteHandler = async ()=>{
    try {
      if(confirm("you want to delete this comment, Are you sure?")){
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
      }
      
    } catch (error:any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }



  return (
    <div className='mb-5 rounded-l p-3 bg-gray-200 border-2 border-gray-300'>
      <div className='flex items-center justify-between mb-2'>
        <strong className='text-gray-800 uppercase'>
          {comment.user.username}
        </strong>
        <span className='bg-yellow-700 px-1 rounded-lg text-white'>
          {new Date(comment.createdAt).toDateString()}
          </span>
      </div>
      <p className='text-gray-800 mb-2'>
        {comment.text}
         </p>
        {userId && userId === comment.userId && (
           <div className='flex justify-end items-center'>
           <FaEdit 
           className='text-green-600 text-xl cursor-pointer me-3'
           onClick={() => setUpdateModalShow(true)}
           />
           <FaTrash 
           className='text-red-600 text-xl cursor-pointer' 
           onClick={commentDeleteHandler}
           />
        </div>
        )}

         {updateModalShow && (<UpdateCommentModal setUpdateModalShow={setUpdateModalShow} text={comment.text} commentId={comment.id} />)}
    </div>
  )
}

export default CommentItem
