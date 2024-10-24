import styles from './contacts-link.module.scss'
import PropTypes from 'prop-types';

export default function ContactsIcon({ href, text, icon }) {
    return (
        <a href={href} className={styles['contacts-link']}>
            <span className={styles['contacts-link__icon']}>{icon}</span>
            <span className={styles['contacts-link__text']}>{text}</span>
        </a>
    )
}

ContactsIcon.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
