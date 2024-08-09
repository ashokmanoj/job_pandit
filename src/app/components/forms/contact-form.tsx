"use client";
import React, { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { notifyError, notifySuccess } from "@/utils/toast";

const ContactForm = () => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // EmailJS Variables
  const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID!;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
  const AUTO_REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_AUTO_REPLY_TEMPLATE_ID!; // Add this line

  // Handle Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "JobPandit",
      subject: subject,
      message: message
    };

    const autoReplyParams = {
      to_name: name,
      to_email: email,
      message: message
    };

    const validateEmail = (email: string): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
    } else if (name === "") {
      notifyError("Please enter your name");
    } else if (message === "") {
      notifyError("Please enter your message");
    } else if (subject === "") {
      notifyError("Please enter your subject");
    } else {
      setIsUploading(true);
      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          notifySuccess("Email sent successfully");

          // Send auto-reply email
          emailjs
            .send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, autoReplyParams, PUBLIC_KEY)
            .then((response) => {
              console.log("Auto-reply SUCCESS...", response.status, response.text);
            })
            .catch((err) => {
              console.log("Auto-reply FAILED...", err);
            });

          setIsUploading(false);
          handlecancel();
        })
        .catch((err) => {
          console.log("FAILED...", err);
          setIsUploading(false);
          notifyError("Failed to send email");
        });
    }
  };

  //Cancel button
  const handlecancel = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messages"></div>
      <div className="row controls">
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              placeholder="Your Name*"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              placeholder="Email Address*"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <label htmlFor="subject">Subject (optional)</label>
            <input
              type="text"
              placeholder="Write about the subject here.."
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <textarea
              placeholder="Your message*"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
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
            <button className="btn-eleven fw-500 tran3s d-block" type="submit">
              Send Message
            </button>
          )}

          <button className="btn-eleven fw-500 tran3s d-block mt-20" type="submit" onClick={handlecancel}>
            Cancel
          </button>

        </div>
      </div>
    </form>
  );
};

export default ContactForm;
