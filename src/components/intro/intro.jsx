import styles from './intro.module.scss'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../config';
import classNames from 'classnames';

export default function Intro({ title }) {
    const location = useLocation();
    const isIndexPage = location.pathname === AppRoute.Root;
    return (
        <section className={styles.intro}>
            <div className={styles.intro__wrapper}>
                <div className={styles.container}>
                    <div className={styles['intro__title-wrapper']}>
                        <h1 className={classNames(styles.intro__title, { [styles['intro__title--index']]: isIndexPage })}>{title}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

Intro.propTypes = {
    title: PropTypes.string.isRequired,
}
