import React from 'react';
import Link from 'next/link';
import AccordionItem from '../accordion/accordion-item';

const FaqArea = () => {
  return (
    <section className="faq-section position-relative pt-100 lg-pt-80">
      <div className="container">
        <ul className="nav nav-tabs border-0 justify-content-center" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#fc1" role="tab">All</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc2" role="tab">Marketing</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc3" role="tab">Buying</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc4" role="tab">User Manual</button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc5" role="tab">Payments</button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc6" role="tab"> Terms & Conditions</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc7" role="tab">Account</button>
          </li>
        </ul>
        <div className="bg-wrapper mt-60 lg-mt-40">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" role="tabpanel" id="fc1">
              <div className="accordion accordion-style-two" id="accordionTwo">
                <AccordionItem id='one' title='How does the free trial work?' desc='The jobpandit free trial offers you a risk-free way to explore all of the features and benefits of our job portal website before committing to a paid subscription.' parent='accordionTwo' />
                <AccordionItem  id='two' title='How do you find different criteria in your process?' desc="With jobpandit's powerful search tools, applicant tracking system, and real-time job alerts, finding the right candidate has never been easier" parent='accordionTwo' />
                <AccordionItem id='three' title='What do you look for in a founding team?' desc='Expertise and experience: The team should have a deep understanding of the industry and/or technology they are working in, and ideally have relevant experience.Passion and commitment: The founders should be passionate about their idea and committed to seeing it through, even when things get tough.Complementary skill sets: A strong founding team will have a mix of skills that complement each other, such as technical, business, and marketing expertise' parent='accordionTwo' />
                <AccordionItem id='four' title='Do you recommend Pay as you go or Pre pay?' desc='Pay as you go: This option allows for greater flexibility and budget control, but can sometimes be more expensive in the long run.
                  or Pre pay: This option can offer discounts and longer-term commitments, but may not be as flexible as pay as you go.' parent='accordionTwo' />
                <AccordionItem id='five' title='What do I get for $0 with my plan?' desc='Jobpandit gives powerful features like advanced search and job alerts, you can find the right job faster.
                  You can Create a profile, post your resume, and apply to jobs with ease.
                  Let jobpandit help you take the next step in your career!' parent='accordionTwo' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc2">
              <div className="accordion accordion-style-two" id="accordionThree">
                <AccordionItem id='six' title='How does jobpandit help job seekers?' desc=' jobpandit offers powerful search tools, job alerts, and easy resume posting to help job seekers find the perfect job faster.' parent='accordionThree' />
                <AccordionItem id='seven' title='How does jobpandit help employers?' desc='jobpandit offers advanced applicant tracking, targeted job posting, and detailed candidate profiles to help employers find the right candidates quickly and easily.' parent='accordionThree' />
                <AccordionItem id='eight' title='Why should I choose jobpandit over other job portals?' desc='jobpandit stands out from other job portals because of our powerful features, user-friendly design, and commitment to providing a high-quality job search experience. With advanced search, job alerts, and detailed candidate profiles, we help job seekers and employers connect faster and more efficiently.' parent='accordionThree' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc3">
              <div className="accordion accordion-style-two" id="accordionFour">
                <AccordionItem id='nine' title=' How much does jobpandit cost?' desc='jobpandit offers both pay as you go and pre pay options, with pricing that varies depending on your needs. To learn more, please contact our sales team at care@rankbook.in' parent='accordionFour' />
                <AccordionItem id='ten' title='Can I try jobpandit before I buy?' desc=' Absolutely! We offer a free trial so you can explore all of jobpandits features before committing to a paid subscription.' parent='accordionFour' />
                <AccordionItem id='eleven' title='Is my payment information secure?' desc='Absolutely! jobpandit uses the highest standards of data security and encryption to protect your information. All credit card transactions are processed through a secure server, and we never store your credit card information. You can be confident that your payment information is safe with jobpandit.' parent='accordionFour' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc4">
              <div className="accordion accordion-style-two" id="accordionFive">
                <AccordionItem id='twelve' title='Create Account' desc='Open an account effortlessly and kickstart your career path..' parent='accordionFive' />
                <AccordionItem id='thirteen' title='Complete your profile' desc='Boost your profile with all the details to catch clients attention.' parent='accordionFive' />
                <AccordionItem id='fourteen' title='Apply job or hire' desc='Apply for jobs that match your preferences, meet the requirements, and land the perfect position.' parent='accordionFive' />
              </div>
            </div>

            {/* <div className="tab-pane fade" role="tabpanel" id="fc5">
              <div className="accordion accordion-style-two" id="accordionSix">
                <AccordionItem id='fifteen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
                <AccordionItem id='sixteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
              </div>
            </div> */}

            <div className="tab-pane fade" role="tabpanel" id="fc6">
              <div className="accordion accordion-style-two" id="accordionSeven">
                <AccordionItem id='seventeen' title='Introduction' desc='Welcome to Jobpandit ("the Website"). These Terms and Conditions ("Terms") govern your use of our open-source job portal. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.' parent='accordionSeven' />
                <AccordionItem id='eighteen' title='Definitions' desc='User: Any individual or entity using the Website.
                  Employer: Any User who posts job listings on the Website.
                  Job Seeker: Any User who searches for or applies to job listings on the Website.
                  Content: Any information, text, graphics, or other materials uploaded, downloaded, or appearing on the Website.' parent='accordionSeven' />
                <AccordionItem id='nineteen' title='Use of the Website' desc='3.1 Eligibility
                  Users must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you meet this age requirement.
                  3.2 User Accounts
                  Users may be required to create an account to access certain features of the Website. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  3.3 Acceptable Use
                  You agree not to use the Website for any unlawful or prohibited activities, including but not limited to:
                  Posting false or misleading job listings.
                  Uploading or distributing any illegal, harmful, or offensive content.
                  Collecting personal data from other Users without their consent.
                  Interfering with the operation of the Website.' parent='accordionSeven' />
                <AccordionItem id='twenty' title='User Content' desc='Users retain ownership of the content they post on the Website. By posting content, you grant Jobpandit a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on the Website.
                  4.2 Responsibility Users are solely responsible for the content they post. Jobpandit does not endorse, guarantee, or assume responsibility for any user-generated content.' parent='accordionEight' />
                <AccordionItem id='twentyone' title=' Job Listings' desc='5.1 Posting Jobs
                  Employers can post job listings in accordance with these Terms. Job listings must be accurate and not misleading.            
                  5.2 Applications
                  Job Seekers can apply to job listings through the Website. Jobpandit is not responsible for the outcome of any job application.
                  6. Intellectual Property
                  The Website and its original content, features, and functionality are owned by Jobpandit and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                  7. Disclaimer of Warranties
                  The Website is provided on an "as-is" and "as-available" basis. Jobpandit makes no warranties, expressed or implied, regarding the operation of the Website or the information, content, or materials included on the Website.
                  8. Limitation of Liability
                  In no event shall Jobpandit be liable for any damages (including, without limitation, incidental and consequential damages, lost profits, or damages resulting from lost data or business interruption) resulting from the use or inability to use the Website.
                  9. Indemnification
                  You agree to indemnify, defend, and hold harmless Jobpandit, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of the Website or violation of these Terms.
                  10. Changes to the Terms
                  Jobpandit reserves the right to modify these Terms at any time. We will notify Users of any changes by posting the new Terms on the Website. Your continued use of the Website after such changes constitutes your acceptance of the new Terms.
                  11. Governing Law
                  These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                  12. Contact Information
                  If you have any questions about these Terms, please contact us at jobpandit.in.' parent='accordionEight' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc7">
              <div className="accordion accordion-style-two" id="accordionEight">
                <AccordionItem id='twentyone' title=' How do I login to my jobpandit account?' desc='To login, simply enter your email address and password on the jobpandit homepage. If you are forgotten your password, click the "Forgot Password" link to reset it.' parent='accordionEight' />
                <AccordionItem id='twentytwo' title='How do I change my email address or password' desc='To change your email address or password, go to the "Account Settings" page in your account and follow the prompts.' parent='accordionEight' />
                <AccordionItem id='twentythree' title='Can I have multiple accounts on jobpandit?' desc='While we recommend using a single account to take full advantage of jobpandits features, you cannot create multiple accounts.However, please be aware that each account will require a separate login and payment information. ' parent='accordionEight' />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-bottom pb-150 lg-pb-50 mt-60 lg-mt-40 wow fadeInUp">
          <div className="title-three mb-30">
            <h2 className="fw-normal">Don’t get your answer?</h2>
          </div>
          <Link href='/contact' className="btn-one">Contact Us</Link>
        </div>
      </div>
    </section>
  );
};

export default FaqArea;