
import "./Footer.css";
function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-about">
                    <h2>OJAS</h2>
                    <p>
                        A simple platform for nutritionists and patients
                        to manage nutrition and health records in one place.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <a href="/">Home</a>
                    <a href="/features">Features</a>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact Us</a>
                </div>

                <div className="footer-links">
                    <h3>Get Started</h3>
                    <a href="/login">Login</a>
                    <a href="/signup">Sign Up</a>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>support@ojas.com</p>
                    <p>Bangalore, India</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 OJAS. All rights reserved.</p>
            </div>

        </footer>
    );
}

export default Footer;

