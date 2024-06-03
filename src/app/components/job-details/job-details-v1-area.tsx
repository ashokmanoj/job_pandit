import React from 'react';
import Image from 'next/image';
import formatAmount from '@/hooks/funcs/formateAmount';

const JobDetailsV1Area = ({job}:{job:any}) => {
	
  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
			<div className="container">
				<div className="row">
					<div className="col-xxl-9 col-xl-8">
						<div className="details-post-data me-xxl-5 pe-xxl-4">
							<div className="post-date">{new Date(job?.created_at).toDateString()} by <a href="#" className="fw-500 text-dark">{job?.company.company_name}</a></div>
							<h3 className="post-title">{job?.title}</h3>
							<ul className="share-buttons d-flex flex-wrap style-none">
								{/* <li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-facebook"></i>
									<span>Facebook</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-twitter"></i>
									<span>Twitter</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-link-45deg"></i>
									<span>Copy</span>
								</a></li> */}
								{job?.company?.social_links?.map((link:any, index:number) => (
									<li key={index}>
										<a href={link.value} className="d-flex align-items-center justify-content-center">
											<i className={link.label==="LinkedIn"?`bi bi-linkedin`:link.label==="Facebook"?`bi bi-twitter`:link.label==="Twitter"?`bi bi-twitter`:link.label==="Instagram"?`bi bi-instagram`:link.label==="YouTube"?`bi bi-youtube`:"bi bi-link-45deg"}></i>
											<span>{link.label}</span>
										</a>
									</li>
								))}
								
							</ul>

							<div className="post-block border-style mt-50 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">1</div>
									<h4 className="block-title">Overview</h4>
								</div>
								<p>{job?.company.about}</p>
							</div>
							<div className="post-block border-style mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">2</div>
									<h4 className="block-title">Job Description</h4>
								</div>
								<p>{job?.description}</p>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">3</div>
									<h4 className="block-title">Responsibilities</h4>
								</div>
								<ul className="list-type-one style-none mb-15">
									<li>Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.</li>
									<li>Co-lead ideation sessions, workshops, demos, and presentations with clients on-site</li>
									<li>Push for and create inclusive, accessible design for all</li>
									<li>Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
									<li>Sketch, wireframe, build IA, motion design, and run usability tests</li>
									<li>Design pixel perfect responsive UI’s and understand that adopting common interface pattern is better for UX than reinventing the wheel</li>
									<li>Ensure content strategy and design are perfectly in-sync</li>
									<li>Give and receive design critique to help constantly refine and push our work</li>
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">4</div>
									<h4 className="block-title">Required Skills:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									<li>You’ve been designing digital products for 2+ years.</li>
									<li>A portfolio that exemplifies strong visual design and a focus on defining the user experience.</li>
									<li>You’ve proudly shipped and launched several products.</li>
									<li>You have some past experience working in an agile environment – Think two-week sprints.</li>
									<li>Experience effectively presenting and communicating your design decisions to clients and team members</li>
									<li>Up-to-date knowledge of design software like Figma, Sketch etc.</li>
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">5</div>
									<h4 className="block-title">Benefits:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									<li>We are a remote-first company.</li>
									<li>100% company-paid health insurance premiums for you & your dependents</li>
									<li>Vacation stipend</li>
									<li>Unlimited paid vacation and paid company holidays</li>
									<li>Monthly wellness/gym stipend</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-xxl-3 col-xl-4">
						<div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
						<Image src={job?.company?.avatar ?`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/employer_avatars/${job.company?.avatar}`:"/assets/images/candidates/01.png"} alt="company-logo" className="lazy-img rounded-circle m-auto" style={{objectFit:"cover", width:"80px", height:"auto",aspectRatio:"1/1"}} width={80} height={80} />
							<div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">{job.company.company_name}</div>
							<a href={job.company.website} className="website-btn tran3s">Visit website</a>

							<div className="border-top mt-40 pt-40">
								<ul className="job-meta-data row style-none">
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Salary</span>
										<div>₹ {formatAmount(job.min_salary)}-{formatAmount(job.max_salary)}/{job.salary_type}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Qualification</span>
										<div>{job.education}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Experience</span>
										<div>{job.experience}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Location</span>
										<div>{job.location}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Job Type</span>
										<div>{job.job_type}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Date</span>
										<div>{new Date(job?.created_at).toDateString()}  </div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Work Mode</span>
										<div>{job.workmode}</div>
									</li>
								</ul>
								<div className="job-tags d-flex flex-wrap pt-15">
									{job.skills && job.skills.map((t:string,i:number) => (
									<a key={i} href="#">{t}</a>
									))}
								</div>
								<a href="#" className="btn-one w-100 mt-25">Apply Now</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  );
};

export default JobDetailsV1Area;