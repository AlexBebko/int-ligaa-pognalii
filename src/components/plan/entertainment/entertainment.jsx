import styles from './entertainment.module.scss';
import PropTypes from 'prop-types';

export default function Entertainment({ changedCountries, onInputChange }) {
    return (
        <div className={styles.entertainment}>
            <div className={styles.entertainment__wrapper}>
                {changedCountries.length === 0 ? (
                    <p className={styles.entertainment__text}>Пожалуйста, выберите хотя бы одну страну для добавления планов на отдых.</p>
                ) : (
                    <ul className={styles.entertainment__list}>
                        {changedCountries.map((country) => (
                            <li key={country.name} className={styles.entertainment__item}>
                                <div className={styles.entertainment__country}>
                                    <span className={styles['entertainment__country-name']}>{country.name}</span>
                                    <div className={styles['entertainment__flag-wrapper']}>
                                        <img src={country.flag} alt={`Флаг страны ${country.name}`} />
                                    </div>
                                </div>
                                <div className={styles['entertainment__input-wrapper']}>
                                    <textarea
                                        className={styles.entertainment__input}
                                        id="entertainmentInput"
                                        name={country.name}
                                        maxLength={200}
                                        placeholder="План действий"
                                        rows={4}
                                        onChange={(e) => onInputChange(country.name, e.target.value)}
                                        required
                                    ></textarea>
                                    <span className={styles['entertainment__input-alert']}>Это поле должно быть заполнено</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

Entertainment.propTypes = {
    changedCountries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            flag: PropTypes.string.isRequired,
        })
    ).isRequired,
    onInputChange: PropTypes.func.isRequired,
};
