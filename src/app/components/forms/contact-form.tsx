"use client";
import React, { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { notifyError, notifySuccess } from "@/utils/toast";


const ContactForm = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // react hook form
 const handleSubmit = (e:FormEvent) => {
   e.preventDefault();

   const serviceID = "service_uu61fim";
   const templateID = "template_qkvavw7";
   const publickKey = "m6m3UJbRwKeLaezwW";

   const templateParams = {

    from_name: name,
    from_email: email,
    to_name: "JobPandit",
    subject: subject,
    message: message

   };
   const validateEmail = (email: string): boolean => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

   
    if(!validateEmail(email)){
      notifyError('Please enter a valid email address');
		}
    else if(name===''){
      notifyError('Please enter your name');
    }
    else if(message===''){
      notifyError('Please enter your message');
    }
    else if(subject===''){
      notifyError('Please enter your subject');
    }
    else{
      emailjs.send(serviceID, templateID, templateParams, publickKey)
   .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    notifySuccess("Email sent successfully");
   setTimeout(window.location.reload.bind(window.location), 2000); })
  }
  
  //  .catch((err) => {
  //   console.log('FAILED...', err);
  //   notifyError("Failed to send email");
  //  });
 }

  
  return (
    <form >
      <div className="messages"></div>
      <div className="row controls">
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="">Name*</label>
            <input
              type="text"
              placeholder="Your Name*"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="">Email*</label>
            <input
              type="email"
              placeholder="Email Address*"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <label htmlFor="">Subject (optional)</label>
            <input
              type="text"
              placeholder="Write about the subject here.."
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <textarea
              placeholder="Your message*"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-12">
        {isUploading ? (
            <button
              className="btn-eleven fw-500 tran3s d-block mt-20"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
          <button className="btn-eleven fw-500 tran3s d-block" onClick={handleSubmit}>
            Send Message
          </button>
          )}
          {/* <button className="btn-eleven fw-500 tran3s d-block mt-10 " >
             Cancle
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
