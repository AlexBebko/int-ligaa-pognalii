import PropTypes from 'prop-types';
import './pagination.scss';
import classNames from 'classnames';

// использовался паттерн из видеоурока https://www.youtube.com/watch?v=s59kRbD4Sw8

function Pagination({
    totalItems = 16, // общее количество элементов
    paginate, // функция переключения страницы, принимающая номер нужной страницы
    prevPage, // функция перехода на предыдущую страницу
    nextPage, // функция перехода к следующей странице
    currentPage,
    pageNumbers,
}) {

    return totalItems && totalItems > 0 ? (
        <div className="pagination">
            <ul className="pagination__links">
                {pageNumbers.map((number) => {
                    return (
                        <li
                            className={classNames('pagination__link', {
                                'pagination__link--active':
                                    number === currentPage,
                            })}
                            key={number}
                        >
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                    );
                })}
            </ul>
            <div className="pagination__buttons">
                <button
                    className="pagination__button"
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                ></button>
                <button
                    className="pagination__button pagination__button--next"
                    type="button"
                    onClick={nextPage}
                    disabled={currentPage === pageNumbers.length}
                ></button>
            </div>
        </div>
    ) : null;
}

Pagination.propTypes = {
    totalItems: PropTypes.number,
    paginate: PropTypes.func,
    prevPage: PropTypes.func,
    nextPage: PropTypes.func,
    currentPage: PropTypes.number,
    pageNumbers: PropTypes.array
};

export default Pagination;
