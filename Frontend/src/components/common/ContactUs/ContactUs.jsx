
import "./ContactUs.css";
import Footer from "../Footer/Footer";
const ContactUs = () => {
  return (
    <div className="contact-page">

      <div className="contact-content">

        <h1>Contact Us</h1>

        <p>
          Have a question or want to know more about OJAS?
          Feel free to connect with us.
        </p>

        <div className="contact-box">

          <h2>Get In Touch</h2>

          <p>
            We are always happy to hear from you. For any questions,
            feedback, or support, feel free to reach out to us.
          </p>

          <div className="contact-details">

            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:help.ojas360@gmail.com">
                help.ojas360@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <h3>Phone</h3>
              <p>+91 80 4567 8900</p>
            </div>

            <div className="contact-item">
              <h3>Location</h3>
              <p>Bangalore, India</p>
            </div>

          </div>

        </div>

      </div>
        <Footer />
    </div>
  );
};

export default ContactUs;