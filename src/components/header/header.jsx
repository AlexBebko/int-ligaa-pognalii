import { useState, useEffect, useCallback } from 'react'
import styles from './header.module.scss';
import Logo from '../ui/logo';

import BurgerButton from '../ui/burger-button/burger-button';
import NavMenu from './nav-menu';
import ContactIcons from './contacts';
import Socials from './socials/socials';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width:1023px)'))

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const breakpointChecker = useCallback(() => {
        if (!isMobile && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMobile, isMenuOpen]);

    useEffect(() => {
        const breakpoint = window.matchMedia('(max-width:1023px)');
        const handleResize = () => setIsMobile(breakpoint.matches);

        breakpoint.addEventListener('change', handleResize);
        handleResize();

        return () => {
            breakpoint.removeEventListener('change', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isMenuOpen]);

    useEffect(() => {
        breakpointChecker();
    }, [isMobile, breakpointChecker]);

    return (
        <header className={`${styles.header} ${isMenuOpen ? styles['is-open'] : ''}`}>
            <div className={styles.container}>
                <div className={styles['header__wrapper']}>
                    <Logo className={`${isMenuOpen ? styles['header__logo--is-open'] : ''}`} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
                    <div className={`${styles.header__links} ${isMenuOpen ? styles['is-open'] : ''}`}>
                        <NavMenu toggleMenu={toggleMenu}/>
                        <ContactIcons />
                        <Socials />
                    </div>
                    <BurgerButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    );
}

export default Header;
