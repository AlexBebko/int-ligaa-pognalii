import styles from './social-link.module.scss'
import PropTypes from 'prop-types';

export default function SocialLink({ href, icon }) {
    return (
        <a className={styles['social-link']} href={href} target="_blank" rel="nofollow noopener noreferrer">{icon}</a>
    )
}

SocialLink.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};
