import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSavedCandidateStore from "@/lib/store/savedCandidate";




const CandidateItem = ({ item }: { item:any }) => {
  const {savedCandidates,add_to_list} = useSavedCandidateStore((state) => state);
  const isActive = savedCandidates.some(p => p.id === item.id);

  // handle add wishlist
  const handleAddWishlist = (item: any) => {
    add_to_list(item)
  };
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
        <Link href={`/candidate/${item.id}`} className="rounded-circle">
          <Image src={item?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${item?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{objectFit:"cover", width:"60px", height:"auto",aspectRatio:"1/1"}} width={60} height={60} />
        </Link>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <a href="/candidate" className="tran3s">
                    {item.name}
                  </a>
                </h4>
                <div className="candidate-post">{item.interstedIn}</div>
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="candidate-info">
                <span>Qualification</span>
                <div>
                  {item.qualification}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="candidate-info">
                <span>Experience</span>
                <div>{item.experience}</div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-4">
              
              <div className="d-flex justify-content-md-end align-items-center">
              <button 
                  className="save-btn  text-center rounded-circle tran3s mt-10"
                  style={{top:"80px",marginRight:"10px",background:isActive?'#005025':'#fff',color:isActive?'#fff':'#005025'}}
                  onClick={() => handleAddWishlist(item)}
                >
                  <i className="bi bi-bookmark-check"></i>
              </button>
                <a
                  href={`/candidate/${item.id}`}
                  className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                >
                  <i className="bi bi-eye"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateItem;
