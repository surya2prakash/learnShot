import React from 'react'
import Footer from '../components/Common/Footer'
import ContactDetails from '../components/core/ContactUsPage/ContactDetails'
import ContactForm from '../components/core/ContactUsPage/ContactForm'

export default function Contact() {
  return (
    <div>
         <div>
              <div>
                    <ContactDetails/>
              </div>
              <div>
                  <ContactForm/>
              </div>
         </div>
         <div>
            <h1 className='text-center font-semibold mt-8 text-4xl'>Reviews from other learners</h1>

         </div>
         <Footer/>
    </div>
  )
}
