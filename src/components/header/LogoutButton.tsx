"use client";
import axios from 'axios';
import {DOMAIN} from '@/utils/constant';
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';


const LogoutButton = () => {

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push('/');
      router.refresh();
      
    } catch (error) {
      toast.warning("somthing went wrong!");
      console.log(error);
    }
  }

  return (
    <button className='bg-gray-700 text-gray-200 px-1 rounded' onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton
