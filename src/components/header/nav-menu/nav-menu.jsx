import { Link } from 'react-router-dom';
import { AppRoute } from '/src/config';
import styles from './nav-menu.module.scss'
import PropTypes from 'prop-types';

function NavMenu({toggleMenu}) {
    const breakpoint = window.matchMedia('(max-width:1023px)');

    const handleItemClick = () => {
        if (breakpoint.matches) {
           toggleMenu();
        }
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__list}>
                <NavItem to="/intern-pognali-2-8/" handleItemClick={handleItemClick}>О СЕРВИСЕ</NavItem>
                <NavItem to={AppRoute.Root} handleItemClick={handleItemClick}>НАПРАВЛЕНИЯ</NavItem>
                <NavItem to={AppRoute.Catalog} handleItemClick={handleItemClick}>ПОПУТЧИКИ</NavItem>
            </ul>
        </nav>
    );
}

function NavItem({ to, children, handleItemClick }) {
    return (
        <li className={styles.nav__item} onClick={handleItemClick}>
            <Link to={to} className={styles.nav__link}>
                <span data-content={children}>{children}</span>
            </Link>
        </li>
    );
}

NavMenu.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
};

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    handleItemClick: PropTypes.func.isRequired,
};

export { NavMenu, NavItem };
