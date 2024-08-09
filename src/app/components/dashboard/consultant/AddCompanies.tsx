'use client'
import React, { useState } from 'react'
import { notifyError } from '@/utils/toast';
import Category from '../employ/category';
import AddCompanyLogo from './addCompanyLogo';
import Companies from './companies';



const AddCompanies = ({ company, setCompany }: { company: any, setCompany: any }) => {
    const [eduVal, setEduVal] = useState({ company_name: '', company_logo: '', company_location: '', company_sector: '' });
    const [uploading, setUploading] = useState<boolean>(false);

    const handleAdd = (e: any) => {
        e.preventDefault();
        if (eduVal.company_name === '') {
            return notifyError('Please Enter Vendor Name')
        } else if (eduVal.company_logo === '') {
            return notifyError('Please Upload Vendor Logo')
        }
        else if (eduVal.company_location === '') {
            return notifyError('Please Enter Location')
        }
        else if (eduVal.company_sector === '') {
            return notifyError('Please Enter Sector')
        }
        else {
            setUploading(true)
            setCompany([...company, eduVal])
            setEduVal({ company_name: '', company_logo: '', company_location: '', company_sector: '' })
            setUploading(false)
        }

    }

    const handleDelete = (index: number) => {
        return (index: number) => {
            const arr = [...company]
            arr.splice(index, 1)
            setCompany(arr)
        }
    }

    const setCategory = (a: string) => {
        setEduVal({ ...eduVal, company_sector: a })
    }

    const setAvatar = (a: string) => {
        setEduVal({ ...eduVal, company_logo: a })
    }

    return (
        <div className="bg-white card-box border-20 mt-40">
            <h4 className="dash-title-three">Members</h4>
            <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                <div className="inner-card border-style mb-60 lg-mb-50">

                    <Companies company={company} handleDelete={handleDelete} />

                    <div className="accordion dash-accordion-one" id="accordionOne">
                        <div className="accordion-item">
                            <div className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Add Companies*
                                </button>
                            </div>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
                                <div className="accordion-body">
                                <div className="row">
                                        <div className="col-lg-2">
                                            <div className="dash-input-wrapper mb-30 md-mb-10">
                                                <label htmlFor="">Upload<span className="text-danger">*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="dash-input-wrapper mb-30">
                                                <AddCompanyLogo avatar={eduVal.company_logo} setAvatar={setAvatar}  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <div className="dash-input-wrapper mb-30 md-mb-10">
                                                <label htmlFor="">Company Name <span className="text-danger">*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="dash-input-wrapper mb-30">
                                                <input type="text" placeholder="Ex : Google" value={eduVal.company_name} onChange={(e) => setEduVal({ ...eduVal, company_name: e.target.value })}  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <div className="dash-input-wrapper mb-30 md-mb-10">
                                                <label htmlFor="">Location*</label>
                                            </div>

                                        </div>
                                        <div className="col-lg-10">
                                            <div className="dash-input-wrapper mb-30">
                                                <input type="text" placeholder="Ex : London" value={eduVal.company_location} onChange={(e) => setEduVal({ ...eduVal, company_location: e.target.value })} />
                                            </div>

                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-2">
                                            <div className="dash-input-wrapper mb-30 md-mb-10">
                                                <label htmlFor="">Sector*</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-10">
                                            <div className="dash-input-wrapper mb-30">
                                                <Category category={eduVal.company_sector} setCategory={setCategory} title={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {uploading ?
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            <>
                                <a  className="dash-btn-one coursor-pointer" onClick={handleAdd}><i className="bi bi-plus"></i> Add more</a></>}
                    </div>
                </div>
            </div>
            </div>
            )
}


            export default AddCompanies;