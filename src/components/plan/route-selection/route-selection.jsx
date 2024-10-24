import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './route-selection.module.scss';
import { ReactComponent as ArrowDown } from '/src/assets/icons/arrow-down-icon.svg';
import { ReactComponent as IconClose } from '/src/assets/icons/icon-close.svg';
import { ReactComponent as IconPlus } from '/src/assets/icons/icon-plus.svg';
import { ReactComponent as IconArrow } from '/src/assets/icons/arrow-icon.svg';
import PropTypes from 'prop-types';
import { LETTERS } from '../../../config'

function LetterButton({ letter, isActive, onClick }) {
    return (
        <button
            className={classNames(styles['choose-country__letter-button'], {
                [styles['choose-country__letter-button--current']]: isActive,
            })}
            type="button"
            onClick={() => onClick(letter)}
        >
            {letter}
        </button>
    );
}

function CountryDropdown({ selectedLetter, onSelectCountry, onSelectLetter, countries, selectedCountries }) {
    const filteredCountries = countries
        .filter(country => country.name.startsWith(selectedLetter))
        .filter(country => !selectedCountries || !selectedCountries.some(selectedCountry => selectedCountry && selectedCountry.name === country.name));
    return (
        <div className={classNames(styles['choose-country__dropdown'], { [styles['choose-country__dropdown--is-open']]: true })}>
            <div className={styles['choose-country__alphabet-list']}>
                {LETTERS.map((letter) => (
                    <LetterButton key={letter} letter={letter} isActive={letter === selectedLetter} onClick={onSelectLetter} />
                ))}
            </div>
            {selectedLetter && (
                <ul className={styles['choose-country__countries-list']}>
                    {filteredCountries.map((country) => (
                        <li
                            key={country.name}
                            className={styles['choose-country__countries-item']}
                            onClick={() => onSelectCountry(country)}
                        >
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function ChooseCountry({ index, onRemove, countries, onCountrySelect, selectedCountry, selectedCountries }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [isSelected, setSelectedState] = useState(!!selectedCountry);

    useEffect(() => {
        if (selectedCountry) {
            setSelectedState(true);
        }
    }, [selectedCountry]);

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
    };

    const handleCountryClick = (country) => {
        setIsOpen(false);
        setSelectedState(true);
        onCountrySelect(index, country);
    };

    return (
        <div className={styles['choose-country']}>
            <button
                className={classNames(styles['choose-country__button'], { [styles['choose-country__button--is-open']]: isOpen })}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles['choose-country__button-text']}>
                    {selectedCountry ? selectedCountry.name : 'Выберите страну'}
                </span>
                <span className={classNames(styles['choose-country__button-icon'], styles['choose-country__button-icon--arrow'])}><ArrowDown viewBox="0 0 23 11" /></span>
                <span className={classNames(styles['choose-country__button-icon'], styles['choose-country__button-icon--close'])}><IconClose viewBox="0 0 24 22" /></span>
            </button>
            <span className={classNames(styles['choose-country__marker'], { [styles['choose-country__marker--selected']]: selectedCountry })}></span>
            <div className={classNames(styles['choose-country__flag-wrapper'], { [styles['choose-country__flag-wrapper--selected']]: isSelected })}>
                {selectedCountry && <img className={styles['choose-country__flag']} src={selectedCountry.flag} alt={`Флаг страны ${selectedCountry.name}`} />}
            </div>
            <button className={styles['choose-country__delete-button']} type="button" onClick={() => onRemove(index)}>
                <IconClose viewBox="0 0 24 22" />
            </button>
            {isOpen && (
                <CountryDropdown
                    selectedLetter={selectedLetter}
                    onSelectCountry={handleCountryClick}
                    onSelectLetter={handleLetterClick}
                    countries={countries}
                    selectedCountries={selectedCountries}
                />
            )}
            <IconArrow className={styles['choose-country__arrow']} />
        </div>
    );
}

export default function RouteSelection({ countries, onRouteChange, selectedCountries }) {
    const [chooseCountryList, setChooseCountryList] = useState(selectedCountries.map(() => ({})));
    const [selectedCountriesState, setSelectedCountriesState] = useState(selectedCountries);

    useEffect(() => {
        setSelectedCountriesState(selectedCountries);
        if (!selectedCountries.length) {
            setChooseCountryList([{}]);
        }
    }, [selectedCountries]);


    const handleAddCountry = () => {
        if (chooseCountryList.length < 4) {
            setChooseCountryList([...chooseCountryList, {}]);
            setSelectedCountriesState([...selectedCountriesState, null]);
        }
    };

    const handleRemoveCountry = (index) => {
        const updatedList = chooseCountryList.filter((_, i) => i !== index);
        setChooseCountryList(updatedList);

        const updatedCountries = selectedCountriesState.filter((_, i) => i !== index);
        setSelectedCountriesState(updatedCountries);

        onRouteChange(updatedCountries);
    };

    const handleCountrySelect = (index, country) => {
        if (!country) return;

        const updatedCountries = [...selectedCountriesState];
        updatedCountries[index] = country;
        setSelectedCountriesState(updatedCountries);

        onRouteChange(updatedCountries);
    };

    return (
        <div className={styles['route-selection']}>
            <div className={styles['route-selection__wrapper']}>
                <div className={styles['route-selection__countries']}>
                    {chooseCountryList.map((_, index) => (
                        <ChooseCountry
                            key={index}
                            index={index}
                            onRemove={handleRemoveCountry}
                            countries={countries}
                            onCountrySelect={handleCountrySelect}
                            selectedCountry={selectedCountriesState[index]}
                            selectedCountries={selectedCountriesState}
                        />
                    ))}
                    {chooseCountryList.length < 4 && (
                        <div className={styles['route-selection__add-wrapper']}>
                            <button className={styles['route-selection__button-add']} type="button" onClick={handleAddCountry}>
                                <span className={styles['route-selection__button-add-text']}>Добавить страну</span>
                                <span className={styles['route-selection__button-add-icon']}><IconPlus viewBox="0 0 21 21" /></span>
                            </button>
                            <span className={classNames(styles['choose-country__marker'], styles['choose-country__marker--add'])}></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

LetterButton.propTypes = {
    letter: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

RouteSelection.propTypes = {
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            flag: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRouteChange: PropTypes.func.isRequired,
    selectedCountries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            flag: PropTypes.string,
        })
    ).isRequired,
};

ChooseCountry.propTypes = {
    index: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            flag: PropTypes.string.isRequired,
        })
    ).isRequired,
    onCountrySelect: PropTypes.func.isRequired,
    selectedCountry: PropTypes.shape({
        name: PropTypes.string,
        flag: PropTypes.string,
    }),
    selectedCountries: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        flag: PropTypes.string,
    })),
};

CountryDropdown.propTypes = {
    selectedLetter: PropTypes.string.isRequired,
    onSelectCountry: PropTypes.func.isRequired,
    onSelectLetter: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            flag: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCountries: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        flag: PropTypes.string,
    })),
}
