'use client'
import React, { useState } from 'react'
import { notifyError } from '@/utils/toast';
import MemberEdit from './MemberEdit';


const AddMember = ({ member, setMember }: { member: any, setMember: any }) => {
  const [eduVal, setEduVal] = useState({ name: '', designation: '', email: '' })
  const handleAdd = (e: any) => {
    e.preventDefault();
    if(eduVal.name===''){
      return notifyError('Please Enter name')
    }else if(eduVal.designation===''){
     return notifyError('Please Enter designation')
    }
    else if(eduVal.email===''){
     return notifyError('Please Enter email')
    }
    else{
      setMember([...member, eduVal])
      setEduVal({ name: '', designation: '', email: '' })
    }
   
  }

  const handleDelete = (index: number) => {
    return (index: number) => {
      const arr = [...member]
      arr.splice(index, 1)
      setMember(arr)
    }
  }
  console.log(member, 'member');
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Members</h4>
      <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
        <div className="inner-card border-style mb-60 lg-mb-50">
          
          <MemberEdit member={member} handleDelete={handleDelete} />
       
      <div className="accordion dash-accordion-one" id="accordionOne">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Add member*
            </button>
          </div>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
            <div className="accordion-body">
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Name*</label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Product Designer (Google)" value={eduVal.name} onChange={(e) => setEduVal({ ...eduVal, name: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Designation*</label>
                  </div>

                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type="text" placeholder="Google Arts Collage & University" value={eduVal.designation} onChange={(e) => setEduVal({ ...eduVal, designation: e.target.value })} />
                  </div>

                </div>
              </div>
              
                
              <div className="row">
                <div className="col-lg-2">
                  <div className="dash-input-wrapper mb-30 md-mb-10">
                    <label htmlFor="">Email*</label>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="dash-input-wrapper mb-30">
                    <input type='email' className="" placeholder="ex:admi@gmail.com" value={eduVal.email} onChange={(e) => setEduVal({ ...eduVal, email: e.target.value })}></input>
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

export default AddMember;