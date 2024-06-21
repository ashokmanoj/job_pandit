'use client'
import React, { useEffect, useState } from 'react'
import ApplyModel from '../common/popup/apply'
import { fetchMyApplications } from '@/hooks/client-request/application';
import { useUserStore } from '@/lib/store/user';

const Apply = ({ job_id }: { job_id: number }) => {
    const { user } = useUserStore();
    const [isApplied, setIsApplied] = useState(false);
    useEffect(() => {
        async function fetch(user_id: string) {
          const { data, error } = await fetchMyApplications(user_id);
          console.log(data, error);
          if (!error) {
            data.map((item: any) => {
              if (item.jobpost_id === job_id) {
                setIsApplied(true);
              }
            })
          }
        }
        if (user?.id) {
          fetch(user?.id);
        }
      }, [user?.id]);
    return (
        <div>
            {isApplied ? <button disabled className="btn-one w-100 mt-25">Applied</button> : <button data-bs-toggle="modal"
                data-bs-target="#applyModel" className="btn-one w-100 mt-25">Apply Now</button>}
        <div>
                <div><ApplyModel job_id={job_id} /></div>
            </div>
        </div>
    )
}

export default Apply