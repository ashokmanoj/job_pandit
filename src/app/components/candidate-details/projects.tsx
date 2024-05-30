'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const Projects = ({ item, index }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" col-xxl-6 col-lg-6" key={index}>
      <div className="text_1 fw-500 ">
        <Image
          src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/project_images/${item.image}`}
          alt=""
          className="w-100  lazy-img rounded "
          style={{ width: "100%", height: "100%" }}
          width={500}
          height={500}
        />
      </div>
      <a href={item.link}> <div className='row'><h4 className='col-10'>{item.title}</h4><p className=' col-2'><i className='bi bi-github'></i></p></div></a>
      <p className={`text-truncate h-40 ${open ? "text-wrap" : ""}`}>{item?.description}. </p>
      <span className="fw-100 fs-8 text-primary cursor-pointer" onClick={() => setOpen(!open)}>Read More</span>
    </div>
  )
}

export default Projects