import React from 'react'
import Image from 'next/image'
import ProjectsModel from '../common/popup/projects'

const Projects = ({ item, index }: { item: any, index: number }) => {


  return (
    <div key={index}>
      <div data-bs-toggle="modal"
        data-bs-target={`#projectsModel${index}`} className=" project-card " key={index}>
        <div className="text_1 fw-500 ">
          <Image
            src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/project_images/${item.image}`}
            alt=""
            className="w-100  lazy-img border  "
            style={{width: "100%", height: "100%", objectFit: "cover",aspectRatio: "1/1" , objectPosition: "center",borderTopLeftRadius: "20px", borderTopRightRadius: "10px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "10px"}}
            width={500}
            height={500}
          />
        </div>
        <div><h4 className='col-10 text-truncate'>{item.title}</h4></div>
      </div>
      <div><ProjectsModel item={item} index={index} /></div>
    </div>

  )
}

export default Projects