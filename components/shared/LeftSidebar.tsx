"use client";

import { sidebarLinks } from '@/constants';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';


const LeftSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const {userId} = useAuth()
  return (
    <section className='custom__scrollbar left__side__bar'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return(
            <Link href={link.route} key={link.label} >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p>{link.label}</p>
            </Link>
          )
        })}

    </section>
  );
}

export default LeftSidebar;
