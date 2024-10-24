import styles from './transport.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as IconPlane } from '/src/assets/icons/icon-plane.svg';
import { ReactComponent as IconBus } from '/src/assets/icons/icon-bus.svg';
import { ReactComponent as IconBicycle } from '/src/assets/icons/icon-bicycle.svg';
import { ReactComponent as IconRun } from '/src/assets/icons/icon-run.svg';
import { TransportToggle } from '../../filters/filters';

function TransportButton({ icon }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            className={classNames(styles.transport__button, {
                [styles['transport__button--is-active']]: isActive,
            })}
            type="button"
            onClick={() => setIsActive(!isActive)}
        >
            {icon}
        </button>
    );
}

function Transport() {
    return (
        <ul className={styles.transport}>
            <li className={styles.transport__item}>
                <TransportToggle
                    name={'fly'}
                    icon={<IconPlane viewBox="0 0 23 24" />}
                />
            </li>
            <li className={styles.transport__item}>
                <TransportToggle
                    name={'car'}
                    icon={<IconBus viewBox="0 0 23 24" />}
                />
            </li>
            <li className={styles.transport__item}>
                <TransportToggle
                    name={'bicycle'}
                    icon={<IconBicycle viewBox="0 0 23 24" />}
                />
            </li>
            <li className={styles.transport__item}>
                <TransportToggle
                    name={'run'}
                    icon={<IconRun viewBox="0 0 23 24" />}
                />
            </li>
        </ul>
    );
}

TransportButton.propTypes = {
    icon: PropTypes.node.isRequired,
};

export default Transport;
