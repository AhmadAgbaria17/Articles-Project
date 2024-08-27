"use client";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import styles from './header.module.css'
import { useState } from "react";

interface NavbarProps{
  isAdmin : boolean;
}

const Navbar = ({isAdmin}:NavbarProps) => {

  const [toggle,setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
    <div>
      <Link href='/' className={styles.logo}>
        CLOUD
        <GrTechnology/>
        Hosting
      </Link>

      <div className={styles.menu} onClick={() => setToggle(prev => !prev)}>
        {toggle ?<IoMdClose />:<MdOutlineMenu />  }
        
      </div>
    </div>

    <div className={styles.navLinksWrapper}
    style={{
      clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
    }}
    >
      <ul className={styles.navLinks}> 
        <Link onClick={()=>setToggle(false)} href='/' className={styles.navLink}>Home</Link>
        <Link onClick={()=>setToggle(false)} href='/articles?pageNumber=1' className={styles.navLink}>Articles</Link>
        <Link onClick={()=>setToggle(false)} href='/about' className={styles.navLink}>About</Link>
        {isAdmin &&
        (
        <Link onClick={()=>setToggle(false)} href='/admin' className={styles.navLink}>Admin Dashborad</Link>
        )}
      </ul>
    </div>
</nav>
   )
}

export default Navbar
