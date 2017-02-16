/**
 * @author Sven Koelpin
 */
import React from 'react';
import style from './loading.less';

export default () => {
    return (
        <div className={style.load}>
            <div className='loader'/>
        </div>
    );
}