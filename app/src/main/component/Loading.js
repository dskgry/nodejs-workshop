/**
 * @author Sven Koelpin
 */
import React from 'react';
import { bool } from 'prop-types';
import style from './loading.less';

const Loading = ({cover}) => {
    return (
        <div className={`${style.load} ${cover ? style.cover : ''}`}>
            <div className='loader'/>
        </div>
    );
};

Loading.propTypes = {
    cover: bool
};

export default Loading;
