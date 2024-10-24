import styles from './burger-button.module.scss';
import PropTypes from 'prop-types';

function BurgerButton({ isMenuOpen, onClick }) {
    return (
        <button
            className={`${styles['burger-button']} ${isMenuOpen ? styles['is-open'] : ''}`}
            type="button"
            onClick={onClick}>
        </button>
    )
}

export default BurgerButton;

BurgerButton.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};
