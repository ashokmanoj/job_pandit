import React from "react";
import Image from "next/image";
import Link from "next/link";


const CandidateGridItem = ({ item, style_2 = false }: { item: any; style_2?: boolean }) => {
  return (
    <div
      className={`candidate-profile-card ${item.favorite ? "favourite" : ""} text-center ${style_2 ? 'border-0' : ''} grid-layout mb-25`}
    >
      <Link href="/candidate" className="save-btn tran3s">
        <i className="bi bi-heart"></i>
      </Link>
      <div className="cadidate-avatar online position-relative d-block m-auto">
        <Link href="/candidate-profile-v1" className="rounded-circle">
          <Image src={item?.avatar ? `https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/avatars/${item?.avatar}` : "/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle" style={{ objectFit: "cover", width: "45px", height: "auto", aspectRatio: "1/1" }} width={60} height={60} />
        </Link>
      </div>
      <h4 className="candidate-name mt-15 mb-0">
        <Link href="/candidate-profile-v1" className="tran3s">
          {item.name}
        </Link>
      </h4>
      <div className="candidate-post">{item.post}</div>
      <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pt-30 sm-pt-20 pb-10">
        {item.resume.skills.slice(0, 3).map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
        {item.resume.skills.length > 3 && (
          <li className="more">
            {item.resume.skills.length - item.resume.skills.slice(0, 3).length}+
          </li>
        )}
      </ul>
      <div className="row gx-1">
        <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Qualification</span>
            <div>
              {item.qualification}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Experience</span>
            <div>{item.experience}</div>
          </div>
        </div>
      </div>
      <div className="row gx-2 pt-25 sm-pt-10 m-auto ">
        <div className="col-md-12  ">
          <Link href={`candidate/${item.id}`}
            className="profile-btn tran3s w-100 mt-5"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateGridItem;
