import React from 'react'
import ResetPassword from '../components/forms/reset_password'

const page = () => {
  return (
    <div>
        <>
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
        <div className="form-wrapper m-auto">
          <ResetPassword />
        </div>
        </div>
      </div>
    </section>
        </>
    </div>
  )
}

export default page