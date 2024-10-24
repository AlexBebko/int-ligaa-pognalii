/* eslint-disable react/prop-types */
import styles from "./footer-social-link.module.scss"

export default function FooterSocialLink ({href, icon}) {
  return (
    <a className={styles["footer-social-link"]} href={href} target="_blank" rel="nofollow noopener noreferrer">
      <span className={styles["footer-social-link__icon"]}>{icon}</span>
    </a>
  )
}