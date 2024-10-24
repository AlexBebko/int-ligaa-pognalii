import styles from "./filters.module.scss";
import classNames from "classnames";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { useLayoutEffect, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconPlane } from "/src/assets/icons/icon-plane.svg";
import { ReactComponent as IconBus } from "/src/assets/icons/icon-bus.svg";
import { ReactComponent as IconBicycle } from "/src/assets/icons/icon-bicycle.svg";
import { ReactComponent as IconRun } from "/src/assets/icons/icon-run.svg";
import { ReactComponent as BtnArrow } from "/src/assets/icons/btn-arrow-icon.svg";
import { ReactComponent as IconTick } from "/src/assets/icons/tick.svg";

function CustomToggle({ name, label }) {
    return (
        <label className={styles["custom-toggle"]}>
            <input className={styles["visually-hidden"]} type="checkbox" name={name} />
            <span className={styles["custom-toggle__icon"]}>
                <IconTick />
            </span>
            <span className={styles["custom-toggle__label"]}>{label}</span>
        </label>
    );
}

CustomToggle.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export function TransportToggle({ name, icon }) {
    return (
        <label className={styles["toggle-transport"]}>
            <input className={styles["visually-hidden"]} type="checkbox" name={name} />
            <span className={styles["toggle-transport__icon"]}>{icon}</span>
        </label>
    );
}

TransportToggle.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export default function Filters() {
    const sliderRef = useRef(null);

    const updateAccordionHeights = () => {
        const accordionElements = document.querySelectorAll('[data-accordion-element]');
        accordionElements.forEach((accordionElement) => {
            if (accordionElement && accordionElement.classList.contains('is-open')) {
                accordionElement.style.maxHeight = `${accordionElement.scrollHeight}px`;
            }
        });
    };

    useLayoutEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;

            noUiSlider.create(slider, {
                start: [30, 100],
                connect: true,
                range: {
                    min: 0,
                    max: 100
                },
                step: 1,
                margin: 5,
            });

            const handleUpdate = (values) => {
                const [min, max] = values;
                document.querySelector('input[data-filters-min]').value = Math.round(min);
                document.querySelector('input[data-filters-max]').value = Math.round(max);
            };

            slider.noUiSlider.on('update', handleUpdate);

            const minInput = document.querySelector('input[data-filters-min]');
            const maxInput = document.querySelector('input[data-filters-max]');

            const handleMinInputChange = (e) => {
                slider.noUiSlider.set([e.target.value, null]);
            };

            const handleMaxInputChange = (e) => {
                slider.noUiSlider.set([null, e.target.value]);
            };

            minInput.addEventListener('input', handleMinInputChange);
            maxInput.addEventListener('input', handleMaxInputChange);

            return () => {
                slider.noUiSlider.off('update', handleUpdate);
                minInput.removeEventListener('input', handleMinInputChange);
                maxInput.removeEventListener('input', handleMaxInputChange);
                slider.noUiSlider.destroy();
            };
        }
    }, []);

    useEffect(() => {
        const accordionToggles = document.querySelectorAll('[data-accordion-toggle]');
        const breakpoints = window.matchMedia('(max-width: 767px), (min-width: 1024px)');

        const handleToggle = (event) => {
            const accordionToggle = event.target.closest('[data-accordion-toggle]');
            const accordionElement = accordionToggle.nextElementSibling;

            if (accordionToggle) {
                accordionToggle.classList.toggle('filters__legend--is-open');
            }

            if (accordionElement && accordionElement.hasAttribute('data-accordion-element')) {
                if (accordionElement.style.maxHeight) {
                    accordionElement.style.maxHeight = null;
                } else {
                    accordionElement.style.maxHeight = `${accordionElement.scrollHeight}px`;
                }
                accordionElement.classList.toggle('is-open');
            }
        };

        const addEventListeners = () => {
            accordionToggles.forEach((toggle) => {
                toggle.addEventListener('click', handleToggle);
            });
        };

        const removeEventListeners = () => {
            accordionToggles.forEach((toggle) => {
                toggle.removeEventListener('click', handleToggle);
            });
        };

        const breakpointChecker = () => {
            if (breakpoints.matches) {
                addEventListeners();
            } else {
                removeEventListeners();
            }
        };

        breakpoints.addEventListener('change', breakpointChecker);

        breakpointChecker();
        window.addEventListener('resize', updateAccordionHeights);

        return () => {
            removeEventListeners();
            breakpoints.removeEventListener('change', breakpointChecker);
            window.removeEventListener('resize', updateAccordionHeights);
        };
    }, []);

    useEffect(() => {
        updateAccordionHeights();
    })

    const handleSubmitForm = (evt) => {
        evt.preventDefault();

    }

    return (
        <section className={styles.filters}>
            <div className={styles.filters__wrapper}>
                <h2 className={styles.filters__title}>Подберите идеального попутчика</h2>
                <form className={styles.filters__form} id="filters" onSubmit={handleSubmitForm}>
                    <fieldset className={styles.filters__fieldset}>
                        <h3 className={styles.filters__legend} tabIndex={0} data-accordion-toggle>
                            <span className={styles["filters__legend-text"]}>ХОББИ</span>
                            <BtnArrow viewBox="0 0 11 13" />
                        </h3>
                        <ul className={styles.filters__list} data-accordion-element>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"gym"} label={"Спортзал"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"hookah"} label={"Кальян"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"sofa"} label={"Диван"} />
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className={styles.filters__fieldset}>
                        <h3 className={styles.filters__legend} data-accordion-toggle>
                            <span className={styles["filters__legend-text"]}>МУЗЫКА</span>
                            <BtnArrow viewBox="0 0 11 13" />
                        </h3>
                        <ul className={styles.filters__list} data-accordion-element>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"hard-rock"} label={"Тяжелый рок"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"russian-rap"} label={"Русский рэп"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"eurodance"} label={"Евродэнс"} />
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className={styles.filters__fieldset}>
                        <h3 className={styles.filters__legend} data-accordion-toggle>
                            <span className={styles["filters__legend-text"]}>ЕДА</span>
                            <BtnArrow viewBox="0 0 11 13" />
                        </h3>
                        <ul className={styles.filters__list} data-accordion-element>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"meat-eater"} label={"Мясоед"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"proper-nutrition"} label={"Сидит на ПП"} />
                            </li>
                            <li className={styles.filters__item}>
                                <CustomToggle name={"raw-vegan"} label={"Веган-сыроед"} />
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className={classNames(styles.filters__fieldset, styles["filters__fieldset--transport"])}>
                        <h3 className={styles.filters__legend} data-accordion-toggle>
                            <span className={styles["filters__legend-text"]}>Транспорт</span>
                            <BtnArrow viewBox="0 0 11 13" />
                        </h3>
                        <ul className={classNames(styles.filters__list, styles["filters__list--transport"])} data-accordion-element>
                            <li className={styles.filters__item}>
                                <TransportToggle name={"fly"} icon={<IconPlane viewBox="0 0 23 24" />} />
                            </li>
                            <li className={styles.filters__item}>
                                <TransportToggle name={"car"} icon={<IconBus viewBox="0 0 23 24" />} />
                            </li>
                            <li className={styles.filters__item}>
                                <TransportToggle name={"bicycle"} icon={<IconBicycle viewBox="0 0 23 24" />} />
                            </li>
                            <li className={styles.filters__item}>
                                <TransportToggle name={"run"} icon={<IconRun viewBox="0 0 23 24" />} />
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className={classNames(styles.filters__fieldset, styles["filters__fieldset--level"])}>
                        <h3 className={styles.filters__legend} data-accordion-toggle>
                            <span className={styles["filters__legend-text"]}>Левел:</span>
                            <BtnArrow viewBox="0 0 11 13" />
                        </h3>
                        <div className={styles["filters__slider-wrapper"]} data-accordion-element>
                            <div className={styles["filters__slider-inputs"]}>
                                <input className={classNames(styles["filters__input"], styles["filters__input--min"])} type="number" name="min-level" id="min-level" defaultValue={"30"} data-filters-min />
                                <input className={classNames(styles["filters__input"], styles["filters__input--max"])} type="number" name="max-level" id="max-level" defaultValue={"100"} data-filters-max />
                            </div>
                            <div className={styles.filters__slider} ref={sliderRef}></div>
                        </div>
                    </fieldset>
                    <button className={styles.filters__button} type="submit">Показать</button>
                </form>
            </div>
        </section>
    );
}
