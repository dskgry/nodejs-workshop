/**
 * @author Sven Koelpin
 */
import React from 'react';
import style from './loading.less';

const Loading = ({cover}) => {
    return (
        <div className={`${style.load} ${cover ? style.cover : ''}`}>
            <div className='loader'/>
        </div>
    );
};

Loading.propTypes = {
    cover: React.PropTypes.bool
};

export default Loading;
