import ContactsLink from '/src/components/ui/contacts-link/contacts-link';
import { ReactComponent as IconCall } from '/src/assets/icons/icon-call.svg';
import { ReactComponent as IconMail } from '/src/assets/icons/icon-mail.svg';
import styles from './contact-icons.module.scss'

const ContactIcons = () => {
    return (
        <div className={styles.contacts}>
            <ContactsLink href={"tel:88005558628"} text={"8 800 555-86-28"} icon={<IconCall />} />
            <ContactsLink href={"mailto:mail@htmlacademy.ru"} text={"mail@htmlacademy.ru"} icon={<IconMail />} />
        </div>
    );
};

export default ContactIcons;
