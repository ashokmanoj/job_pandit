'use client'
import React, { useState } from 'react'
import EducationEdit from './EducationEdit';
import { notifyError } from '@/utils/toast';

const AddEducation = ({ education, setEducation }: { education: any[], setEducation: any }) => {
  const [eduVal, setEduVal] = useState({ title: '', college: '', from: '', to: '', description: '' })
  const handleAdd = (e: any) => {
    e.preventDefault();
    if(eduVal.title===''){
      return notifyError('Please Enter Title')
    }else if(eduVal.college===''){
     return notifyError('Please Enter College')
    }
    else if(eduVal.from===''){
     return notifyError('Please Enter From')
    }
    else if(eduVal.to===''){
    return  notifyError('Please Enter To')
    }
    else if(eduVal.description===''){
     return notifyError('Please Enter Description')
    }else if(eduVal.from > eduVal.to){
      return notifyError('From Date should be less than To Date')
    }else if(eduVal.to === eduVal.from){
      return notifyError('From Date should be less than To Date')
    }
    else{
      setEducation([...education, eduVal])
      setEduVal({ title: '', college: '', from: '', to: '', description: '' })
    }
   
  }

  const handleDelete = (index: number) => {
    return (index: number) => {
      const arr = [...education]
      arr.splice(index, 1)
      setEducation(arr)
    }
  }
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Education<span className="text-danger">*</span></h4>
      <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
        <div className="inner-card border-style mb-60 lg-mb-50">
          {/* <h3 className="dash-title-three">Add Education</h3> */}
          {/* WorkExperience */}
          <EducationEdit education={education} handleDelete={handleDelete} />
          {/* WorkExperience */}
       
      <div className="accordion dash-accordion-one" id="accordionOne">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Add Education
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
                    <input type="text" placeholder="Ex : Degree" value={eduVal.title} onChange={(e) => setEduVal({ ...eduVal, title: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Academy<span className="text-danger">*</span></label>
                  </div>

                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Ex : Google Arts Collage & University" value={eduVal.college} onChange={(e) => setEduVal({ ...eduVal, college: e.target.value })} />
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Year<span className="text-danger">*</span></label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">From</label>
                        <input type="date" value={eduVal.from} onChange={(e) => setEduVal({ ...eduVal, from: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                        <label htmlFor="">To</label>
                        <input type="date" value={eduVal.to} onChange={(e) => setEduVal({ ...eduVal, to: e.target.value })} />
                      </div>
                    </div>
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
                    <textarea className="size-lg" placeholder="Write something about your education........." value={eduVal.description} onChange={(e) => setEduVal({ ...eduVal, description: e.target.value })}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <a href="#" className="dash-btn-one coursor-pointer" onClick={handleAdd}><i className="bi bi-plus"></i> Add more</a>
    </div>
    </div>
    
      </div>
  )
}

export default AddEducation