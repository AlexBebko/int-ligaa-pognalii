import PropTypes from 'prop-types';
import Like from '../ui/like/like';
import ProgressBar from '../ui/progress-bar/progress-bar';
import './card.scss';
import classNames from 'classnames';
import { AVATARS, TRANSPORT_KINDS } from '../../config';

function Card({
    name = 'Петя Демин', // имя
    avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)], // ссылка на картинку аватар
    online = true, // онлайн или офлайн участник
    active = false, // поставлен ли лайк
    likes = Math.floor(Math.random() * 1500), // количество лайков
    invite = true, // можно ли пригласить участника (свою карточку нельзя)
    hashtags = '#бургер #бар #футбол #концерт #крафт', // строка хэштегов
    transport_choice = [], // массив из выбранных видов транспорта
    level = 80, // уровень карточки
    country = [
        // массив выбранных стран
        {
            flag: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Belgium_%28civil%29.svg', // картинка флага
            country: 'Бельгия', // название страны
        },
        {
            flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
            country: 'Чехия',
        },
    ],
}) {
    const transportChoiceLowerCase = transport_choice.map((item) =>
        item.toLowerCase()
    );

    return (
        <article className="card">
            <div className="card__img">
                <picture>
                    <img src={avatar} alt="Аватар" />
                </picture>
            </div>
            <div
                className={classNames('card__title', {
                    'card__title--online': online,
                })}
            >
                <a href="/">
                    <h3>{name}</h3>
                </a>
            </div>
            <p className="card__hashtags">{hashtags}</p>
            {invite && (
                <>
                    <div className="card__button">
                        <button type="button">ПОЗВАТЬ!</button>
                    </div>{' '}
                    <div className="card__likes">
                        <Like active={active} />
                        <span>{likes}</span>
                    </div>
                </>
            )}

            <div className="card__countries-list">
                <h4>хочет посетить:</h4>
                <ul>
                    {country.map((item, i) => {
                        return (
                            <li className="card__countries-item" key={i}>
                                <img
                                    src={item.flag}
                                    alt="флаг"
                                    width="35"
                                    height="24"
                                />
                                <span>{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="card__transport-level">
                <div className="card__transport-list">
                    <h4>транспорт:</h4>
                    <ul>
                        {TRANSPORT_KINDS.map((item, i) => {
                            return (
                                <li
                                    className={classNames(
                                        `card__transport-item card__transport-item--${item}`,
                                        {
                                            'card__transport-item--checked':
                                                transportChoiceLowerCase.includes(
                                                    item.toLowerCase()
                                                ),
                                        }
                                    )}
                                    key={i}
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className="card__level">
                    <h4>левел:</h4>
                    <ProgressBar level={level} />
                </div>
            </div>
        </article>
    );
}

Card.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    online: PropTypes.bool,
    active: PropTypes.bool,
    likes: PropTypes.string,
    invite: PropTypes.bool,
    hashtags: PropTypes.string,
    transport_choice: PropTypes.array,
    level: PropTypes.number,
    country: PropTypes.array,
};

export default Card;
