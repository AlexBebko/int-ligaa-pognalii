import "./footer.scss";
import Logo from "../ui/logo";
import SocialLinks from "./socials";



function Footer(){
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                  <Logo className="logo" />
                  <SocialLinks className="socials" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;
