import useSavedCandidateStore from '@/lib/store/savedCandidate';
import React, { useState } from 'react'

const SavedCandidate = ({item, grid}:{item:any, grid?:boolean}) => {
    const {savedCandidates,add_to_list} = useSavedCandidateStore((state) => state);
  const isActive = savedCandidates.some(p => p.id === item.id);


  // handle add wishlist
  const handleAddWishlist = (item: any) => {
    add_to_list(item)
  };
  return (
    <button className={grid?`save-btn tran3s`:"tran3s"} style={{top:"40px",fontSize:"20px", fontWeight:"bold",color:isActive?"#005025":"#005025",}}  onClick={() => handleAddWishlist(item)} >
        {isActive ? <i className="bi bi-bookmark-check-fill"></i> : <i className="bi bi-bookmark-check"></i>}
      </button>
  )
}

export default SavedCandidate