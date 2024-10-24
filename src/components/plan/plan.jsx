import RouteSelection from './route-selection';
import styles from './plan.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as BtnArrow } from '/src/assets/icons/btn-arrow-icon.svg';
import Entertainment from './entertainment';
import { useSelector } from 'react-redux';
import { getCountries, getStatusFetchForm } from '../../store/data/data.selector';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFormAction } from '../../store/api-actions';
import DateForm from '../date-form';
import { AppRoute, Status } from '../../config';
import { setStatusFetchForm } from '../../store/data/data-slice';
import { redirectToRoute } from '../../store/actions';

export default function Plan() {
    const dispatch = useAppDispatch();
    const countries = useSelector(getCountries);
    const statusFetchForm = useAppSelector(getStatusFetchForm);

    const [currentStep, setCurrentStep] = useState(1);
    const [changedCountries, setChangedCountries] = useState([]);
    const [countryPlans, setCountryPlans] = useState({});
    const [datesOfStay, setDatesOfStay] = useState({});

    useEffect(() => {
        if (statusFetchForm === Status.Success) {
            dispatch(setStatusFetchForm(Status.Idle));

            return () => {
                dispatch(redirectToRoute(AppRoute.Catalog));
            };
        }
    }, [dispatch, statusFetchForm]);

    const handleSubmitForm = (evt) => {
        evt.preventDefault();

        const formElements = document.forms.plan_form.elements;
        const entertainments = formElements.entertainmentInput;

        const entertainmentsData =
            entertainments.length > 1
                ? [...entertainments].map(({ name, value }) => ({
                      name,
                      text: value,
                  }))
                : [
                      {
                          name: entertainments.name,
                          text: entertainments.value,
                      },
                  ];

        const formDirections = document.forms.directions.elements;
        const hashtags = formDirections.tags.value;

        const transportFly = formDirections.fly.checked
            ? formDirections.fly.name
            : null;
        const transportCar = formDirections.car.checked
            ? formDirections.car.name
            : null;
        const transportBicycle = formDirections.bicycle.checked
            ? formDirections.bicycle.name
            : null;
        const transportRun = formDirections.run.checked
            ? formDirections.run.name
            : null;

        const transport = [
            transportFly,
            transportCar,
            transportBicycle,
            transportRun,
        ].filter((item) => item !== null);

        const { companions, startDate, endDate } = datesOfStay;

        const data = {
            startDate,
            endDate,
            companions,
            country: changedCountries.map(({ flag, name }) => ({
                flag,
                name,
                text:
                    entertainmentsData.find((item) => name === item.name)
                        .text || '',
            })),
            text: 'Пример текста',
            transport_choice: transport,
            name: 'Test',
            hashtags: hashtags,
        };

        dispatch(fetchFormAction(data));
    };

    const handleInputChange = (countryName, value) => {
        setCountryPlans((prevPlans) => ({
            ...prevPlans,
            [countryName]: value,
        }));
    };

    const isFormValid = () => {
        if (changedCountries.length === 0) {
            return false;
        }

        return changedCountries.every(
            (country) =>
                countryPlans[country.name] &&
                countryPlans[country.name].trim() !== ''
        );
    };

    const handleNextStep = () => {
        if (currentStep === 2) {
            const filteredChangedCountries = changedCountries.filter(
                (country) => country && country.name
            );
            setChangedCountries(filteredChangedCountries);
        }

        if (currentStep === 2) {
            setCountryPlans(() => {
                const newPlans = {};
                changedCountries.forEach((country) => {
                    if (country && country.name) {
                        newPlans[country.name] =  '';
                    }
                });
                return newPlans;
            });
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRouteChange = (newCountry) => {
        setChangedCountries(newCountry);

        setCountryPlans((prevPlans) => {
            const newPlans = { ...prevPlans };

            Object.keys(newPlans).forEach((countryName) => {
                if (
                    !newCountry.some(
                        (country) => country && country.name === countryName
                    )
                ) {
                    delete newPlans[countryName];
                }
            });

            newCountry.forEach((country) => {
                if (country && country.name && !newPlans[country.name]) {
                    newPlans[country.name] = '';
                }
            });
            return newPlans;
        });
    };

    return (
        <section className={styles.plan}>
            <div className={styles.container}>
                <h2 className={styles.plan__title}>Добавить план:</h2>
                <div className={styles.plan__wrapper}>
                    <div className={styles.plan__header}>
                        <div className={styles['plan__title-wrapper']}>
                            <h3 className={styles['plan__form-title']}>
                                Шаг {currentStep}:{' '}
                                {currentStep === 1
                                    ? 'Даты пребывания'
                                    : currentStep === 2
                                    ? 'Маршрут'
                                    : 'Развлечения'}
                            </h3>
                            {currentStep === 1 && (
                                <p className={styles['plan__description']}>
                                    Укажите предпочтительное количество
                                    попутчиков, которых вы&nbsp;хотели&nbsp;бы
                                    позвать в&nbsp;поездку,
                                    и&nbsp;ее&nbsp;предполагаемую длительность.
                                </p>
                            )}
                            {currentStep === 2 && (
                                <p className={styles['plan__description']}>
                                    Укажите страны, которые
                                    вы&nbsp;хотели&nbsp;бы посетить. <br />
                                    Это может быть одна или сразу несколько
                                </p>
                            )}
                            {currentStep === 3 && (
                                <p className={styles['plan__description']}>
                                    Наконец, расскажите о&nbsp;своих планах
                                    времяпровождения. <br />
                                    Можно писать в&nbsp;свободной форме
                                    и&nbsp;ставить тэги.
                                </p>
                            )}
                        </div>
                        <ul className={styles['plan__steps-list']}>
                            <li
                                className={classNames(
                                    styles['plan__steps-item'],
                                    {
                                        [styles['plan__steps-item--current']]:
                                            currentStep === 1,
                                    }
                                )}
                            >
                                <span>даты</span>
                            </li>
                            <li
                                className={classNames(
                                    styles['plan__steps-item'],
                                    {
                                        [styles['plan__steps-item--current']]:
                                            currentStep === 2,
                                    }
                                )}
                            >
                                <span>маршрут</span>
                            </li>
                            <li
                                className={classNames(
                                    styles['plan__steps-item'],
                                    {
                                        [styles['plan__steps-item--current']]:
                                            currentStep === 3,
                                    }
                                )}
                            >
                                <span>развлечения</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['plan__form-wrap']}>
                        <form id="plan_form" onSubmit={handleSubmitForm}>
                            {currentStep === 1 && (
                                <DateForm callback={setDatesOfStay} />
                            )}
                            {currentStep === 2 && (
                                <RouteSelection
                                    countries={countries}
                                    onRouteChange={handleRouteChange}
                                    selectedCountries={changedCountries}
                                />
                            )}
                            {currentStep === 3 && (
                                <Entertainment
                                    changedCountries={changedCountries}
                                    onInputChange={handleInputChange}
                                />
                            )}
                        </form>
                    </div>
                    <div className={styles['plan__nav']}>
                        {currentStep < 3 && (
                            <button
                                className={styles['plan__button-next']}
                                type={'button'}
                                onClick={handleNextStep}
                            >
                                <span>Следующий шаг</span>
                                <BtnArrow />
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button
                                className={styles['plan__button-next']}
                                type="submit"
                                form="plan_form"
                                disabled={!isFormValid()}
                            >
                                <span>Отправить</span>
                                <BtnArrow />
                            </button>
                        )}
                        {currentStep !== 1 && (
                            <button
                                className={styles['plan__button-back']}
                                type={'button'}
                                onClick={handlePrevStep}
                            >
                                <BtnArrow />
                                <span>На шаг назад</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
