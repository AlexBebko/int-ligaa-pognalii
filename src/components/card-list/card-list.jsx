/* eslint-disable react-hooks/exhaustive-deps */
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';
import './card-list.scss';
import { useAppSelector } from '../../hooks';
import { getCatalog } from '../../store/data/data.selector';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const noData = {
    fontSize: `30px`,
};

function CardList({selectedCountries, countriesArray}) {
    // функция фильтрации карточек
    const cardsFilter = (cards) => {
        const countriesNames = countriesArray.map((country) => country.name);
        //if (selectedCountries) {
            if (selectedCountries.length === 0) {
                return cards.filter((card) => {
                    return card.country.some(obj => countriesNames.includes(obj.name));
                })
            } else {
                return cards.filter((card) => {
                    return card.country.some(obj => selectedCountries.includes(obj.name));
                })
            }
        //}
    }

    const allCards = useAppSelector(getCatalog);
    const [cards, setCards] = useState(cardsFilter(allCards));

    useEffect(() => {
        setCards(cardsFilter(allCards))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCountries, countriesArray, allCards]);

    const itemsPerPage = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(currentPage * itemsPerPage);
    const [firstIndex, setFirstIndex] = useState(lastIndex - itemsPerPage);

    const [currentCards, setCurrentCards] = useState(
        cards.slice(firstIndex, lastIndex)
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCountries, countriesArray])

    useEffect(() => {
        setCurrentCards(cards.slice(firstIndex, lastIndex));
    }, [cards, firstIndex, lastIndex, selectedCountries, countriesArray]);

    useEffect(() => {
        const newLastIndex = currentPage * itemsPerPage;
        if (currentPage * itemsPerPage > cards.length) {
            setLastIndex(cards.length);
        } else {
            setLastIndex(currentPage * itemsPerPage);
        }
        setFirstIndex(newLastIndex - itemsPerPage);
    }, [cards.length, currentPage]);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(cards.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePrevPageClick = () => {
        if (currentPage === 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPageClick = () => {
        if (currentPage === pageNumbers.length) {
            setCurrentPage(pageNumbers.length);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleShowMoreClick = () => {
        if (lastIndex + itemsPerPage > cards.length) {
            setLastIndex(cards.length);
        } else {
            setLastIndex(lastIndex + itemsPerPage);
        }
        setCurrentCards(
            cards.slice(
                currentCards.length - itemsPerPage,
                currentCards.length + itemsPerPage
            )
        );
    };

    return (
        <article className="card-list">
            {cards && cards.length ? (
                <>
                    <ul className="card-list__list">
                        {currentCards &&
                            currentCards.map((card, i) => {
                                return (
                                    <li className="card-list__item" key={i}>
                                        <Card
                                            {...card}
                                        />
                                    </li>
                                );
                            })}
                    </ul>
                    {currentCards.length !== cards.length &&
                        lastIndex !== cards.length && (
                            <button
                                className="card-list__show-more"
                                type="button"
                                onClick={() => handleShowMoreClick()}
                            >
                                Показать еще
                            </button>
                        )}
                    <Pagination
                        totalItems={cards.length}
                        paginate={setCurrentPage}
                        currentPage={currentPage}
                        prevPage={handlePrevPageClick}
                        nextPage={handleNextPageClick}
                        pageNumbers={pageNumbers}
                    />
                </>
            ) : (
                <span style={noData}>Нет данных</span>
            )}
        </article>
    );
}

CardList.propTypes = {
    countriesArray: PropTypes.array,
    selectedCountries: PropTypes.array,
};

export default CardList;
