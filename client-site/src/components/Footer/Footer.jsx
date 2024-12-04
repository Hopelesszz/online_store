import "./Footer.css";
import { faDiscord, faFacebook, faInstagram, faTiktok, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
    return(
        <div className="footer">
            <p>Follow us in our social media</p>
            <div className="icons">
                <FontAwesomeIcon className="footerIcon" icon={faFacebook} />
                <FontAwesomeIcon className="footerIcon" icon={faInstagram} />
                <FontAwesomeIcon className="footerIcon" icon={faXTwitter} />
                <FontAwesomeIcon className="footerIcon" icon={faYoutube} />
                <FontAwesomeIcon className="footerIcon" icon={faTiktok} />
                <FontAwesomeIcon className="footerIcon" icon={faDiscord} />
            </div>
        </div>
    )
}
export default Footer;