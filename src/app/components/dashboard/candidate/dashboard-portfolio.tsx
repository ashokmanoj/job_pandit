import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { notifyError } from "@/utils/toast";

// portfolio item


const DashboardPortfolio = ({projects,setProjects}:{projects:any ,setProjects:any}) => {
  const supabase = createClient();
  const [uploading, setUploading] = useState<boolean>(false);
  const [val ,setVal] = useState<any>({title:'',description:'',url:'',image:''});
  const [files, setFile] = useState<File | null>(null);

  async function handleDeletePhoto(imagePath: string) {
    try {
      console.log(imagePath);
      const { error } = await supabase.storage.from('project_images').remove([imagePath]);
      if (error) {
        console.error("Error deleting image:", error.message);
      } else {
        console.log("Image deleted successfully:", imagePath);
        setVal({...val , image:""}); // Clear the avatar path in state upon successful deletion
      }
    } catch (error: any) {
      console.error("Error deleting image:", error.message);
    }
  }
  
 async function handleAddPortfolio(e: any){
    e.preventDefault();
    if(val.title===''){
      return notifyError('Please Enter Title')
    }else if(val.description===''){
     return notifyError('Please Enter Description')
    }
    else if(val.url===''){
     return notifyError('Please Enter Url')
    }else if(files===null){
     return notifyError('Please Upload Image')
    }
    else{
        const user: any = (await supabase.auth.getUser()).data.user?.id;
        
        const { data, error } = await supabase.storage
          .from("project_images")
          .upload(user +"/"+Date.now(), files, {
            cacheControl: "3600",
            upsert: false,
            contentType: 'image/*',
          });
        if (error) {
          console.error("Error uploading image:", error.message);
        } else {
          console.log("Image uploaded successfully:", data);
          

          setProjects([...projects,{...val , image:data.path}])
          setVal({title:'',description:'',url:'',image:''})
          setFile(null)
          
        }
    }
  }


  const handleDelete = (index: number) => {

      const arr = [...projects]
      handleDeletePhoto(arr[index].image);
      arr.splice(index, 1)
      setProjects(arr)
    
  }
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Portfolio</h4>
      <div className="col-lg-3 col-6" >
      {projects?.map((item:any,index:number)=>
        (
        <div className="candidate-portfolio-block position-relative mb-25" key={index}>
          <a href={item.url} className="d-block">
            <Image src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/project_images/${item.image}`} alt="image" className="lazy-img w-100 aspect-ratio-square rounded" style={{ width: '100%', height: 'auto' }} width={100} height={100} />
          </a>
          <h4 className="position-absolute bottom-0 end-0 text-white background-primary bg-black bg-gradient w-100 ">{item.title}</h4>
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
              Add Project*
            </button>
          </div>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Title*</label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Ex : AI Chatbot (Group Project)"   onChange={(e)=>setVal({...val,title:e.target.value})} value={val.title} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Image *</label>
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
                    <label htmlFor="">Url </label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Ex : https://www.github.com ( put your project link here..)" onChange={(e)=>{setVal({...val,url:e.target.value})}} value={val.url} />
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Description*</label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <textarea className="size-lg" placeholder="Write something about your projrct...." onChange={(e)=>{setVal({...val,description:e.target.value})}} value={val.description}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="dash-btn-one" onClick={handleAddPortfolio}>
        <i className="bi bi-plus"></i> Add more
      </button>
    </div>
  );
};

export default DashboardPortfolio;
