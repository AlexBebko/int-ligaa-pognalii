import styles from './socials.module.scss'
import SocialLink from '/src/components/ui/social-link/social-link'
import { ReactComponent as Telegram } from '/src/assets/icons/telegram.svg'
import { ReactComponent as Vkontakte } from '/src/assets/icons/vkontakte.svg'
import { ReactComponent as Youtube } from '/src/assets/icons/youtube.svg'

export default function Socials() {
    return (
        <div className={styles.socials}>
            <SocialLink href={"#"} icon={<Telegram />} />
            <SocialLink href={"#"} icon={<Vkontakte />} />
            <SocialLink href={"#"} icon={<Youtube />} />
        </div>
    )
}
