'use client'
import React, { useState } from 'react'
import { notifyError } from '@/utils/toast';


const AddLanguage = ({language, setLanguage}:any) => {
 const [val ,setVal] = useState<string>('');
const languages = ['Kannda','English','Hindi']

  function handleDelete(i: any) {
    return () => {
      const newlanguage = [...language];
      newlanguage.splice(i, 1);
      setLanguage(newlanguage);
    };

  }


  function handleAdd(e: any) {
    e.preventDefault();
    if(val===''){
      return notifyError('Please Enter Skill')
    }
    setLanguage([...language, val]);
    setVal('');


  }


  return (
    
          
          <div className="dash-input-wrapper mb-40">
         

            <div className="skills-wrapper">
              <ul className="custom-list style-none d-flex flex-wrap align-items-center ">
              {language?.map((item:any, i:any) => (
                <li key={i} className="is_tag"><button>{item} <i className="bi bi-x" onClick={handleDelete(i)} ></i></button></li>
              ))}
                <li className="is_tag add_tag"><button><input type="text" value={val} onChange={(e) =>{ setVal(e.target.value)}} className='w-100 border-0 p-0 bg-transparent text-dark'/></button></li>
                <li className="more_tag"><button style={{ cursor: "pointer",color:"black" }} onClick={handleAdd}>+</button></li>
              </ul>
              <ul className="custom-list">
              {languages.filter((item) => !language.includes(item))?.map((item:any, i:any) => (
                <li key={i} className="" onClick={()=>{setLanguage([...language, item])}}><button>{item}</button></li>
              ))}
              </ul>
            </div>
          </div>
          
        
  )
}

export default AddLanguage