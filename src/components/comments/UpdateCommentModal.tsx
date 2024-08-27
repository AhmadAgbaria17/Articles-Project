"use client";
import {useState, Dispatch , SetStateAction, FormEvent} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import {IoMdCloseCircleOutline} from 'react-icons/io';
import { DOMAIN } from '@/utils/constant';


interface UpdateCommentModalProps {
  setUpdateModalShow: Dispatch<SetStateAction<boolean>>;
  text:string;
  commentId: number;
}


const UpdateCommentModal = ({setUpdateModalShow,text,commentId}:UpdateCommentModalProps) => {

  const [updatedText,setUpdatedText]= useState(text);
  const router = useRouter();

  const formSubmitHandler = async (e : FormEvent)=>{
    e.preventDefault();
    if(updatedText=== "") return toast.info("please write something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`,{
        text:updatedText
      })
      router.refresh();
      setUpdatedText("");
      setUpdateModalShow(false);
      
    } catch (error:any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  }

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-20 flex items-center justify-center'>
      <div className='w-11/12 lg:w-2/4 bg-white rounded-lg p-3'>
        <div className='flex justify-end items-start'>
          <IoMdCloseCircleOutline onClick={()=>setUpdateModalShow(false)} className='text-red-500 mb-1 cursor-pointer text-2xl'/>
        </div>
        <form onSubmit={formSubmitHandler}>
          <input 
          type='text'
          placeholder='Edit Comment'
          className='text-xl rounded-lg p-2 w-full bg-white mb-2'
          value={updatedText}
          onChange={(e)=>setUpdatedText(e.target.value)}
           />
           <button className='bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition' type='submit'>Edit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCommentModal
