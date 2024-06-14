import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { notifyError } from "@/utils/toast";
import Projects from "../../candidate-details/projects";
import Link from "next/link";

// achievements item


const Achievements = ({achievement,setAchievement}:{achievement:any ,setAchievement:any}) => {
  const supabase = createClient();
  const [uploading, setUploading] = useState<boolean>(false);
  const [valuee ,setValuee] = useState<any>({title:'',description:'',image:''});
  const [files, setFile] = useState<File | null>(null);

  async function handleDeletePhoto(imagePath: string) {
    try {
      console.log(imagePath);
      const { error } = await supabase.storage.from('achievement_images').remove([imagePath]);
      if (error) {
        console.error("Error deleting image:", error.message);
      } else {
        console.log("Image deleted successfully:", imagePath);
        setValuee({...valuee , image:""}); // Clear the avatar path in state upon successful deletion
      }
    } catch (error: any) {
      console.error("Error deleting image:", error.message);
    }
  }
  
 async function handleAddAchiev(e: any){
    e.preventDefault();
    if(valuee.title===''){
      return notifyError('Please Enter Title')
    }else if(valuee.description===''){
     return notifyError('Please Enter Description')
    }
    else if(files===null){
     return notifyError('Please Upload Image')
    }
    else{
        const user: any = (await supabase.auth.getUser()).data.user?.id;
        
        const { data, error } = await supabase.storage
          .from("achievement_images")
          .upload(user +"/"+Date.now(), files, {
            cacheControl: "3600",
            upsert: false,
            contentType: 'image/*',
          });
        if (error) {
          console.error("Error uploading image:", error.message);
        } else {
          console.log("Image uploaded successfully:", data);
          

          setAchievement([...achievement,{...valuee , image:data.path}])
          setValuee({title:'',description:'',image:''})
          setFile(null)
          
        }
    }
  }


  const handleDelete = (index: number) => {

      const array = [...achievement]
      handleDeletePhoto(array[index].image);
      array.splice(index, 1)
      setAchievement(array)
    
  }
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Achievements <span style={{color:'grey',fontSize:'12px'}}>(recommended)</span></h4>

      <div className="row" >
      {achievement?.map((item:any,index:number)=>
        (
        <div className="candidate-portfolio-block position-relative mb-25 col-lg-6 col-md-12" key={index}>
          <a href={item.url} className="d-block">
            <Image src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/achievement_images/${item.image}`} alt="image" className="lazy-img w-100 aspect-ratio-square rounded" style={{ width: '100%', height: '300px' , objectFit: 'cover', aspectRatio: '1/1'}} width={500} height={500} />
          </a>
          <h4>{item.title}</h4>
          
          <p>{item.description}</p>
          <button 
            onClick={()=>{handleDelete(index)}}
            className="remove-portfolio-item rounded-circle d-flex align-items-center justify-content-center tran3s course-pointer bg-white"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
      )
      )}
      </div>
      <div className="accordion dash-accordion-one" id="accordionOne">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Add Achievement or Certificates 
            </button>
          </div>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Title<span className="text-danger">*</span></label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Ex : AI Chatbot (Group Project)"   onChange={(e)=>setValuee({...valuee,title:e.target.value})} value={valuee.title} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Image<span className="text-danger">*</span></label>
                  </div>

                </div>
                <div className="col-lg-10">
                <div className="dash-input-wrapper mb-30 md-mb-10">
                    
                      <input type="file" id="uploadImg" name="uploadImg" placeholder="Upload your project photo" className="pt-2" onChange={(e)=>{e.target.files && e.target.files[0] && setFile(e.target.files[0])}} />
                
                    </div>
                </div>
              </div>
              

              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Description<span className="text-danger">*</span></label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <textarea className="size-lg" placeholder="Write something about your projrct...." onChange={(e)=>{setValuee({...valuee,description:e.target.value})}} value={valuee.description}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="dash-btn-one" onClick={handleAddAchiev}>
        <i className="bi bi-plus"></i> Add more
      </button>
    </div>
  );
};

export default Achievements;
