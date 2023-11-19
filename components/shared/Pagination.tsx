
"use client";

import { useRouter } from 'next/router';
import React from 'react';

const Pagination = ({pageNumber, isNext, path}: {
  pageNumber:number, isNext: boolean, path:string}) => {

    const router = useRouter();


    const handleNavigation = (type: string) => {
      let nextPageNumber = pageNumber;
      if (type === "prev") {
        nextPageNumber = Math.max(1, pageNumber - 1);
      } else if (type === "next") {
        nextPageNumber = pageNumber + 1;
      }

      if(nextPageNumber > 1) {
        router.push(`/${path}?page=${nextPageNumber}`)
      } else {
        router.push(`/${path}`)
      }
    };

    if(!isNext && pageNumber === 1) return null;
  return (
    <section className='pagination__wrapper'>
      <Button
    </section>
  );
}

export default Pagination;
