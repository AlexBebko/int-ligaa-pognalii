/* eslint-disable react/prop-types */
import FooterSocialLink from "../../ui/footer-social-link/footer-social-link";
import { ReactComponent as Telegram } from "/src/assets/icons/telegram.svg"
import { ReactComponent as Vkontakte } from "/src/assets/icons/vkontakte.svg"
import { ReactComponent as Youtube } from "/src/assets/icons/youtube.svg"
import styles from "./socials-footer.module.scss"

const SocialLinks = ({className}) => {
  return (
    <div className={`${styles.socials} ${className ? className : ""}`}>
      <FooterSocialLink href={"#"} icon={<Telegram />} />
      <FooterSocialLink href={"#"} icon={<Vkontakte />} />
      <FooterSocialLink href={"#"} icon={<Youtube />} />
    </div>
  );
};

export default SocialLinks;