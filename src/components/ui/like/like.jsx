import { useState } from 'react';
import PropTypes from 'prop-types';
import "./like.scss";

function Like({active}){
    const [activeLike, setActiveLike] = useState(active);
    return (
        <button type="button" onClick={() => setActiveLike(!activeLike)} className={`like${activeLike ? ` like--active` : ``}`}/>
    )
}

Like.propTypes = {  
    active: PropTypes.bool.isRequired, 
}  

export default Like;