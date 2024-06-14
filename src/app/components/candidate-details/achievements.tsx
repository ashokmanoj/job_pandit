'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import AchievementsModel from '../common/popup/achivements';

const Achievements = ({ item, index }: { item: any, index: number }) => {
  const [open, setOpen] = useState(false);

  return (
<><div className=" project-card" key={index}>
      <div className="text_1 fw-500 ">
        <Image
         src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/achievement_images/${item.image}`}
          alt=""
          className="w-100  lazy-img border"
          style={{width: "100%", height: "100%", objectFit: "cover",aspectRatio: "1/1" , objectPosition: "center",borderTopLeftRadius: "20px", borderTopRightRadius: "10px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "10px"}}
          width={500}
          height={500}
        />
      </div>
      <h4 className='text-truncate'>{item.title}</h4>
    </div>
    <div>
      
    </div>
</>
  )
}

export default Achievements