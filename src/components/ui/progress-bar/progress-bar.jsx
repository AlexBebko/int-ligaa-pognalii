import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./progress-bar.scss";

function ProgressBar({level}){
    const circleRef = useRef(null);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const getStrokeDashoffset = () => {
        if (circleRef.current) {
            const circle = window.getComputedStyle(circleRef.current);
            const strokeDasharray = Number(circle.strokeDasharray.replace("px", ""));
            const strokeDashoffset = `${(strokeDasharray - (strokeDasharray / 100)*level).toFixed(2)}px`;
            return strokeDashoffset;
        }
    };

    const [strokeDashoffset, setStrokeDashoffset] = useState(getStrokeDashoffset());

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
        setStrokeDashoffset(getStrokeDashoffset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, level]);



    return (
        <div className="circle">
            <div className="circle__text">
                <span className="circle__level">{level}</span>
                <span className="circle__title">level</span>
            </div>
            <svg>
                <circle ref={circleRef} className="circle__progress" cx="31" cy="31" r="29.5" strokeDashoffset={strokeDashoffset}></circle>
            </svg>
        </div>
    )
}

ProgressBar.propTypes = {
    level: PropTypes.number.isRequired,
}

export default ProgressBar;
