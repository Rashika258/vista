"use client";

import { usePathname } from 'next/navigation';

import { sidebarLinks } from "@/constants";
import Link from 'next/link';
import Image from 'next/image';
function Bottombar() {
    const pathName = usePathname();
  return (
    <section className='bottom__bar'>
     {
        sidebarLinks.map((link, index) => {
            const isActive = (pathName.includes(link.route) && link.route.length > 1) || pathName === link.route;
            return(
                <Link
                href={link.route} key={link.label} >
                    <Image src={link.imgURL} alt={link.label} width={16} height={16} className='' />
                    <p>{link.label}</p>
                </Link>

            )
        })
     } 
    </section>
  );
}

export default Bottombar;
