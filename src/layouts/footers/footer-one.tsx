'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import logo from "@/assets/images/logo/logo_j.png";
import logo_2 from "@/assets/images/logo/logo_04.png";
import logo_w from "@/assets/images/logo/logo_06.png";
import shape from "@/assets/images/shape/shape_28.svg";
import { WidgetOne, WidgetThree, WidgetTwo } from "./component/footer-widgets";
import SocialLinks from "./component/social-links";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createClient } from "@/utils/supabase/client";


const FooterOne = ({
	bottom_bg,
	style_2 = false,
	style_3 = false,
}: {
	bottom_bg?: string;
	style_2?: boolean;
	style_3?: boolean;
}) => {
	// States
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [ submit, setSubmit ] = useState<any>('submited');
	const [ isUploading, setIsUploading ] = useState<boolean>(false);
	const supabase = createClient();
	
	// Email Validation
	const validateEmail = (email: string): boolean => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	// Handle Submit
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			notifyError('Please enter a valid email address');
		}
		else if (email === '') {
			notifyError('Please enter a valid email address');
		}

		try {
			if (validateEmail(email) && email) {
				setIsUploading(true);
				const { data, error } = await supabase
					.from('enquiry_email')
					.insert([
						{ email: email },
					]);
				console.log('Data inserted successfully:', data);
				if (error) {
					console.log('Error inserting Email', error);
				} else {
					setIsUploading(false);
					setEmail('');
					notifySuccess('Email Sent successfully:');
				}
			}
		}
		catch (error) {
			console.log('Error inserting Email', error);
		}
	}

	return (
		<div className={`footer-one ${style_2 ? "bg-two white-version" : ""}`}>
			<div className="container">
				<div className="inner-wrapper">
					<div className="row">
						<div className="col-lg-2 col-md-3 footer-intro mb-15">
							<div className="logo mb-15">
								<Link href="/" className="d-flex align-items-center">
									<Image src={style_2 ? logo_w : style_3 ? logo_2 : logo} alt="logo" priority style={{ objectFit: "contain", width: "100%", height: "100%" }} />
								</Link>
							</div>
							<Image
								src={shape}
								alt="shape"
								className="lazy-img mt-80 sm-mt-30 sm-mb-20"
							/>
						</div>
						{/* widget one */}
						<WidgetOne style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget two */}
						<WidgetTwo style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget three */}
						<WidgetThree style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget end */}
						<div className="col-lg-4 mb-20 footer-newsletter">
							<h5 className={`footer-title ${style_2 ? "text-white" : ""}`}>
								Newsletter
							</h5>
							<p className={`${style_2 ? "text-white" : ""}`}>
								Join & get important new regularly
							</p>
							<div>
								<form className={`d-flex ${style_3 ? 'border-style' : ''}`}>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>

									{error && <p style={{ color: 'red' }}>{error}</p>}
									{isUploading ? 
            <button  
              type="submit"
			  disabled
            >
              <span
                className="spinner-border spinner-border-sm container" 
                role="status"
                aria-hidden="true"
              ></span>
            </button>
           : 
            <button type="submit" onClick={handleSubmit}>Submit</button>    
          }
								</form>
							</div>
							<p className="note">
								We only send interesting and relevant emails.
							</p>
						</div>
					</div>
				</div>
			</div >
			<div
				className={`bottom-footer ${bottom_bg} ${style_2 ? "mt-50 lg-mt-20" : ""}`}
			>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-4 order-lg-3 mb-15">
							<ul className="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon">
								<SocialLinks />
							</ul>
						</div>
						<div className="col-lg-4 order-lg-1 mb-15">
							<ul className="d-flex style-none bottom-nav justify-content-center justify-content-lg-start">
								<li>
									<Link href='/contact'>Privacy & Terms.</Link>
								</li>
								<li>
									<Link href='/contact'> Contact Us</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-4 order-lg-2">
							<p className={`text-center mb-15 ${style_2 ? "text-white" : ""}`}>
								Copyright @{new Date().getFullYear()} jobpandith.in
							</p>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default FooterOne;
