import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSavedCandidateStore from "@/lib/store/savedCandidate";
import { useUserStore } from "@/lib/store/user";

const CandidateListItem = ({ item,style_2=false }: { item:any;style_2?:boolean }) => {
  const {user} = useUserStore((state) => state);
  const {savedCandidates,add_to_list} = useSavedCandidateStore((state) => state);
  const isActive = savedCandidates.some(p => p.id === item.id);

  // handle add wishlist
  const handleAddWishlist = (item: any) => {
    add_to_list(item)
  };
  return (
    <div
      className={`candidate-profile-card ${item.favorite ? "favourite" : ""} ${style_2?'border-0':''} list-layout mb-25`}
    >
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
                  <Link href={`/candidate/${item.id}`} className="tran3s">
                    {item.name}
                  </Link>
                </h4>
                <div className="candidate-post">{item.interstedIn}</div>
                {/* <ul className="cadidate-skills style-none d-flex align-items-center">
                  {item?.resume?.skills.slice(0, 2).map((s:string, i:number) => (
                    <li className="d-block" key={i}>{s}</li>
                  ))}
                  {item?.resume?.skills?.length > 1 && (
                    <li className="more">
                      {item?.resume?.skills.length - item?.skills?.slice(0, 2).length}+
                    </li>
                  )}
                </ul> */}
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
            <div className="col-xl-2 col-md-3 col-sm-5">
              <div className="candidate-info">
                <span>Experience</span>
                <div>{item.experience}</div>
              </div>
            </div>
            <div className="col-xl-1 col-md-1 col-sm-1">
              <div className="d-flex justify-content-lg-end">
              {user?.role==='company'|| user?.role==='admin'?<button 
                  className="save-btn  text-center rounded-circle tran3s mt-10"
                  style={{top:"80px",background:isActive?'#005025':'#fff',color:isActive?'#fff':'#005025'}}
                  onClick={() => handleAddWishlist(item)}

                >
                  <i className="bi bi-bookmark-check"></i>
              </button>:<></>}
                </div>
                </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-lg-end">
                <button 
                  className="save-btn text-center rounded-circle tran3s mt-10"
                >
                  <i className="bi bi-heart"></i>
                </button>
                
                <Link href={`/candidate/${item.id}`}
                  className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateListItem;
