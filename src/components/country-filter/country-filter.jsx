import { useState, useEffect, useRef } from "react";

import "./country-filter.scss";
import { LETTERS } from "../../config.js";
import PropTypes from 'prop-types';



function CountryFilter({countriesArray, setCountriesArray, countries, handleCheckboxChange, selectedCountries, setSelectedCountries}){

    const europe = useRef(null);
    const asia = useRef(null);
    const americas = useRef(null);
    const oceania = useRef(null);

    const content = useRef(null);

    const letterRefs = useRef([]);
    const letterInputRefs = useRef([]);
    const letterListRefs = useRef([]);

    const [europeCheck, setEuropeCheck] = useState(true);
    const [asiaCheck, setAsiaCheck] = useState(false);
    const [americasCheck, setAmericasCheck] = useState(false);
    const [oceaniaCheck, setOceaniaCheck] = useState(false);

    const [activeFilter, setActiveFilter] = useState(false);
    const [height, setHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [checkedLetterListHeight, setCheckedLetterListHeight] = useState(0)

    const [checkedLetter, setCheckedLetter] = useState("А");

    const isContinent = (ref) => {
        let result = [];
        if (ref.current !== null && ref.current.checked) {
            result = countries.filter((country) => country.continent.toLowerCase() === ref.current.value)
        }
        return result;
    }


    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        setHeight(content.current.offsetHeight)
    },[activeFilter, height, countriesArray, windowWidth, checkedLetterListHeight])

    useEffect(() => {
        // Очищаем выбранные страны при изменении континентов
        setSelectedCountries([]);
        setCountriesArray(getCountriesByContinent(countriesArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [europeCheck, asiaCheck, americasCheck, oceaniaCheck]);

    useEffect(() => {
        setCountriesArray(getCountriesByContinent(countriesArray))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries])

    const getCountriesByContinent = (countriesArray) => {
        countriesArray = [];
        countriesArray.push(...isContinent(europe));
        countriesArray.push(...isContinent(asia));
        countriesArray.push(...isContinent(americas));
        countriesArray.push(...isContinent(oceania));
        if (countriesArray.length === 0) {
            countriesArray.push(...countries);
        }
        return countriesArray;
    }

    const sortByLetter = (letter, countriesArray) => {
        const fullArray = countriesArray.map((item) => item.name);
        const resultArray = fullArray.filter((country) => country.toUpperCase().startsWith(letter));
        return resultArray;
    }

    useEffect(() => {
        letterInputRefs.current.forEach((ref, index) => {
            if (content.current && ref  && letterListRefs.current[index] && ref.checked && windowWidth < 767) {
                let height = letterListRefs.current[index].offsetHeight;
                content.current.style = `padding-bottom: ${30 + height}px`
                setCheckedLetterListHeight(height);
            }
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedLetter, activeFilter, europeCheck, asiaCheck, americasCheck, oceaniaCheck])


    return (
        <section className={`country-filter${activeFilter ? `` : ` country-filter--active`}`}>
            <div className="container">
                <form>
                    <nav className="country-filter__nav">
                        <h2>Фильтрация по странам:</h2>
                        <fieldset>
                            <input ref={europe} checked={europeCheck} onChange={() => {setEuropeCheck(!europeCheck)}} id="europe" type="checkbox" name="continent" value="europe"/>
                            <label htmlFor="europe">Европа</label>
                            <input ref={asia} checked={asiaCheck} onChange={() => {setAsiaCheck(!asiaCheck)}} id="asia" type="checkbox" name="continent" value="asia"/>
                            <label htmlFor="asia">Азия</label>
                            <input ref={americas} checked={americasCheck} onChange={() => {setAmericasCheck(!americasCheck)}} id="americas" type="checkbox" name="continent" value="americas"/>
                            <label htmlFor="americas">Америка</label>
                            <input ref={oceania} checked={oceaniaCheck} onChange={() => {setOceaniaCheck(!oceaniaCheck)}} id="oceania" type="checkbox" name="continent" value="oceania"/>
                            <label htmlFor="oceania">Острова</label>
                        </fieldset>
                        <button className="country-filter__burger-btn" type='button' onClick={() => setActiveFilter(!activeFilter)}><span>{activeFilter ? 'Свернуть' : 'Показать все'}</span></button>
                    </nav>
                    <div className="country-filter__alphabet-wrapper" style={activeFilter ? { height } : null}>
                        <fieldset className='country-filter__alphabet' ref={content}>
                            {LETTERS.map((letter, index) => {return (
                                <div ref={(el) => (letterRefs.current[index] = el)} className='country-filter__letter-wrapper' key={index}>
                                    <input ref={(el) => (letterInputRefs.current[index] = el)} className='country-filter__input' id={letter} type="radio" name="letter" value={letter} checked={checkedLetter === letter ? true : false} onChange={() => setCheckedLetter(letter)}/>
                                    <label className='country-filter__letter' htmlFor={letter}>{letter}</label>
                                    <ul ref={(el) => (letterListRefs.current[index] = el)} className='country-filter__list'>
                                        {sortByLetter(letter, countriesArray).map((item) => {
                                            return (<li className='country-filter__item' key={item}>
                                                <input checked={selectedCountries.includes(item)} onChange={handleCheckboxChange} id={item} type="checkbox" name="country" value={item}></input>
                                                <label htmlFor={item} >{item}</label>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                            )})}
                        </fieldset>
                    </div>
                </form>
                <button className="country-filter__collapse-btn" type='button' onClick={() => setActiveFilter(!activeFilter)}><span>{activeFilter ? 'Свернуть' : 'Показать все'}</span></button>
            </div>
        </section>
    )
}

CountryFilter.propTypes = {
    countriesArray: PropTypes.array,
    setCountriesArray: PropTypes.func,
    countries: PropTypes.array,
    handleCheckboxChange: PropTypes.func,
    selectedCountries: PropTypes.array,
    setSelectedCountries: PropTypes.func
};

export default CountryFilter;
