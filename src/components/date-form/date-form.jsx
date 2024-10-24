import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';
import styles from './date-form.module.scss';
import { ReactComponent as CheckIcon } from '/src/assets/icons/check.svg';
import PropTypes from 'prop-types';
import { format, isBefore, differenceInCalendarDays, isWithinInterval } from 'date-fns';

registerLocale('ru', ru);

function DateFormCalendar({ callback }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const initialEndDate = new Date();
    initialEndDate.setDate(initialEndDate.getDate() + 2);
    return initialEndDate;
  });
  const [travelersCount, setTravelersCount] = useState(2);
  const [duration, setDuration] = useState(() => differenceInCalendarDays(endDate, startDate) + 1);
  const [withChildren, setWithChildren] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInCalendarDays(endDate, startDate) + 1;
      setDuration(days);
    }

    callback({
      companions: travelersCount,
      duration,
      startDate,
      endDate
    });
  }, [callback, duration, startDate, endDate, travelersCount]);

  const handleInputChange = (setter, min, max) => (event) => {
    const value = Number(event.target.value);
    if (value >= min && value <= max) {
      setter(value);
      if (startDate) {
        const newEndDate = new Date(startDate);
        newEndDate.setDate(startDate.getDate() + value - 1);
        setEndDate(newEndDate);
      }
    }
  };

  const handleDateChange = (date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (isBefore(date, startDate)) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    } else {
      if (isBefore(date, startDate)) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const renderDayContents = (day, date) => {
    const firstDayOfMonth = date.getDate() === 1;
    const formattedDate = format(date, ' MMM', { locale: ru }).replace('.', '');
    return (
      <div className={styles['date-form__day-container']}>
        <span>{day}</span>
        {isLargeScreen && (
          <>
            {firstDayOfMonth && <span className={styles['date-form__month-label']}>{formattedDate}</span>}
            {date.toDateString() === startDate.toDateString() && (
              <div className={styles['date-form__check-in-label']}>
                <span>Заезд</span>
              </div>
            )}
            {date.toDateString() === endDate?.toDateString() && (
              <div className={styles['date-form__check-out-label']}>
                <span>Выезд</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const dayClassName = (date) => {
    if (startDate && endDate) {
      const end = new Date(startDate);
      end.setDate(startDate.getDate() + duration - 1);

      if (isBefore(date, new Date())) {
        return styles['date-form__day--disabled'];
      } else if (isWithinInterval(date, { start: startDate, end: end })) {
        return 'react-datepicker__day--selected';
      }
    }
    return '';
  };

  return (
    <div className={styles['date-form']}>
      <div className={styles['date-form__inputs-wrapper']}>
        <div className={styles['date-form__count']}>
          <label htmlFor="travelersCount" className={styles['date-form__count-label']}>ИЩУ ПОПУТЧИКОВ:</label>
          <div className={styles['date-form__count-wrapper']}>
            <button
              aria-label="less"
              type="button"
              className={`${styles['date-form__button']} ${styles['date-form__button--less']}`}
              onClick={() => setTravelersCount((prev) => Math.max(prev - 1, 1))}
              disabled={travelersCount <= 1}
            ></button>
            <input
              className={styles['date-form__count-input']}
              id="travelersCount"
              min="1"
              max="10"
              type="number"
              value={travelersCount}
              name="travelersCount"
              onChange={handleInputChange(setTravelersCount, 1, 10)}
            />
            <button
              aria-label="more"
              type="button"
              className={`${styles['date-form__button']} ${styles['date-form__button--more']}`}
              onClick={() => setTravelersCount((prev) => Math.min(prev + 1, 10))}
              disabled={travelersCount >= 10}
            ></button>
          </div>
          <span className={styles['date-form__count-text']}>ЧЕЛ.</span>
        </div>

        <div className={styles['date-form__checkbox']}>
          <label htmlFor="withChildren" className={styles['date-form__checkbox-wrapper']}>
            <input
              id="withChildren"
              className={styles['visually-hidden']}
              type="checkbox"
              name="withChildren"
              checked={withChildren}
              onChange={(e) => setWithChildren(e.target.checked)}
            />
            <span className={styles['date-form__custom-check']}>
              {withChildren && <CheckIcon />}
            </span>
            <span className={styles['date-form__checkbox-label']}>Можно с&nbsp;детьми</span>
          </label>
        </div>

        <div className={styles['date-form__count']}>
          <label htmlFor="duration" className={`${styles['date-form__count-label']} ${styles['date-form__count-label--duration']}`}>ДЛИТЕЛЬНОСТЬ:</label>
          <div className={styles['date-form__count-wrapper']}>
            <button
              aria-label="less"
              type="button"
              className={`${styles['date-form__button']} ${styles['date-form__button--less']}`}
              onClick={() => handleInputChange(setDuration, 2, 31)({ target: { value: Math.max(duration - 1, 2) } })}
              disabled={duration <= 2}
            ></button>
            <input
              className={styles['date-form__count-input']}
              id="duration"
              min="2"
              max="31"
              type="number"
              value={duration}
              name="duration"
              onChange={handleInputChange(setDuration, 2, 31)}
            />
            <button
              aria-label="more"
              type="button"
              className={`${styles['date-form__button']} ${styles['date-form__button--more']}`}
              onClick={() => handleInputChange(setDuration, 2, 31)({ target: { value: Math.min(duration + 1, 31) } })}
              disabled={duration >= 31}
            ></button>
          </div>
          <span className={styles['date-form__count-text']}>ДН.</span>
        </div>
      </div>

      <div className={styles['date-form__calendar']}>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          inline
          locale="ru"
          id="startDate"
          renderDayContents={renderDayContents}
          minDate={new Date()}
          dayClassName={dayClassName}
        />
      </div>
    </div>
  );
}

DateFormCalendar.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default DateFormCalendar;
