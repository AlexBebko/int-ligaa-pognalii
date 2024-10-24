import { ReactComponent as LogoIcon } from '/src/assets/logo-full.svg'
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../config';
import styles from './logo.module.scss'
import PropTypes from 'prop-types';

export default function Logo({ className, toggleMenu, isMenuOpen }) {
    const location = useLocation();
    const isIndexPage = location.pathname === AppRoute.Root;

    const handleLogoClick = () => {
        if (toggleMenu && isMenuOpen) {
            toggleMenu();
        }
    };

    return isIndexPage ? (
        <span className={styles.logo}>
            <LogoIcon className={`${styles.logo__icon} ${className ? className : ''}`} viewBox="0 0 202 50" />
        </span>
    ) : (
        <Link to={AppRoute.Root} className={styles.logo} onClick={handleLogoClick}>
            <LogoIcon className={`${styles.logo__icon} ${className ? className : ''}`} viewBox="0 0 202 50" />
        </Link>
    )
}

Logo.propTypes = {
    className: PropTypes.string,
    toggleMenu: PropTypes.func,
    isMenuOpen: PropTypes.bool,
};
