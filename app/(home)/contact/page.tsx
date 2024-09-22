/* eslint-disable react/no-unescaped-entities */
import ContactUsCards from "@/components/ContactCards"
import EnquiryForm from "@/components/forms/EnquiryForm"
import PageHeader from "@/components/shared/PageHeader"
import HeadingSubtitle from "@/components/shared/SectionLable"
import Typography from "@/components/typography"
import HighlightedText from "@/components/typography/HighlightedHeading"
import { constants } from "@/config/constants"



const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact" image={`${constants.imagePath}/bim.jpg`} />
      <section className="py-20 px-4 relative">
        <div className="container mx-auto flex gap-10 flex-col lg:flex-row px-4 items-start">
          <div className="flex-auto ">
            <HeadingSubtitle title="Contact Us" />
            <Typography as="title">We're Here To Provide <br /> <HighlightedText>24X7Support</HighlightedText></Typography>
            <Typography as="p" className="mt-3" >
              If you have any questions about our courses, need more information, or want to discuss how SNWEL Academy can support your career goals, we’d love to hear from you. Our team is ready to assist you with any inquiries you may have.
            </Typography>
            <ContactUsCards />
            {/* <ContactForm className="bg-primary/5 mt-10"/> */}
            <div className="bg-primary/5 mt-10"><EnquiryForm type={"general"} /></div>
          </div>

          <div className="sticky top-14 bg-primary rounded-2xl overflow-hidden p-3 lg:p-10 text-primary-foreground space-y-4 max-w-md">
            <Typography as="h1">Say Hello!</Typography>
            <Typography as="p" className="leading-loose">At SNWEL Academy, we’re here to help you take the next step in your professional journey. Whether you’re a student looking to bridge the gap between theory and practice, a job seeker aiming to stand out in the competitive job market, or a working professional eager to stay ahead of industry trends, we have the right training solutions for you</Typography>

            <div className="overflow-hidden relative ">
              <img className="w-full" src={`${constants.imagePath}/contact.jpg`} />
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent to-primary flex flex-col justify-end">
                <div className="py-5 text-center" >
                  <Typography as="h4">24/7 Contact Support</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage