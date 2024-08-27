import Link from 'next/link';
import styles from './header.module.css'
import Navbar from './Navbar'
import { useEffect } from 'react';
import {cookies} from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';

const Header = () => {

  const token = cookies().get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  
  
  return (
    <header className={styles.header}>
      
      <Navbar isAdmin={userPayload?.isAdmin || false}/>

      <div className={styles.right}>
        {userPayload?
        (
          <>
            <strong className='text-blue-800 md:text-xl capitalize'>
              {userPayload?.username}
              </strong>
              <LogoutButton/>

          </>

        ):
        (
          <>
            <Link href='/login' className={styles.btn}>Login</Link>
            <Link href='/register' className={styles.btn}>Register</Link>
          </>
          )}
      </div>
    </header>


  )
}

export default Header
