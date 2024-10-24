import { Helmet } from "react-helmet-async";
import CardList from "../../components/card-list/card-list";
import Filters from "../../components/filters/filters";
import CountryFilter from "../../components/country-filter/country-filter";
import Intro from "../../components/intro";
import "./catalog.scss";
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { useState } from "react";
import { getCatalogAction } from '../../store/api-actions';
import { useAppSelector } from "../../hooks/index.js";
import { getCountries } from "../../store/data/data.selector.js";

function CatalogPage() {
    const countries = useAppSelector(getCountries);
    const [countriesArray, setCountriesArray] = useState(countries);
    // Стейт для хранения выбранных стран
    const [selectedCountries, setSelectedCountries] = useState([]);

    // Функция для обработки изменений checkbox
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCountries((prevSelected) => {
            if (checked) {
                return [...prevSelected, value];
            } else {
                return prevSelected.filter((country) => country !== value);
            }
        });
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCatalogAction());
    },[dispatch])

    return (
        <>
        <Helmet>
            <title>Попутчики</title>
            <meta name="description" content="Каталог попутчиков" />
        </Helmet>
        <Intro title={"Попутчики"} />
        <CountryFilter
            countriesArray={countriesArray}
            setCountriesArray={setCountriesArray}
            countries={countries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            handleCheckboxChange={handleCheckboxChange}
        />
        <section className='catalog'>
            <div className='container'>
            <Filters />
            <CardList selectedCountries={selectedCountries} countriesArray={countriesArray}/>
            </div>

        </section>
        </>
    );
}

export default CatalogPage;
