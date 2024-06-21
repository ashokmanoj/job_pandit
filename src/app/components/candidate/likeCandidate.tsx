'use client'
import { createLike, deleteLike, fetchLike } from '@/hooks/client-request/likes';
import { useUserStore } from '@/lib/store/user';
import { notifyError, notifySuccess } from '@/utils/toast';
import React, { useEffect, useState } from 'react'

const LikeCandidate = ({item_id,grid,secondary}:{item_id:any,grid?:boolean,secondary?:boolean}) => {
    const {user} = useUserStore((state) => state);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (id:string,user_id:string) => {
          if(isLiked){
            deleteLike(id,user_id).then(({data,error}) => {
              if (!error) {
                setIsLiked(false);
                notifyError("You have disliked this candidate");
              }
            })
            
          }else{
            createLike(id,user_id).then(({data,error}) => {
              if (!error) {
                setIsLiked(true);
                notifySuccess("You have liked this candidate");
              }
            })
          }
          
         }
        
         useEffect(() => {
         user?.id && item_id &&fetchLike(item_id,user?.id).then(({data,error}) => {
           if (!error) {
             setIsLiked(true);
           }else{
             setIsLiked(false);
           }
         })
         },[item_id,user?.id,isLiked]);
        
         console.log(isLiked,item_id,user?.id,"like candidate")
  return (
      <button className={grid?"save-btn tran3s ":` tran3s `}  style={{top:"10px",color:secondary?"#D2F34C":"#005025",fontSize:"20px", fontWeight:"bold"}} onClick={() => user&&item_id&&handleLike(item_id,user?.id)} >
       {isLiked? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
      </button>
  )
}

export default LikeCandidate