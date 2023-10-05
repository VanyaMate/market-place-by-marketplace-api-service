import React from 'react';
import { Link } from 'react-router-dom';
import css from './HeaderStoreName.module.scss';


export type HeaderStoreNameProps = {
    name: string;
}

const HeaderStoreName: React.FC<HeaderStoreNameProps> = (props) => {
    const { name } = props;

    return (
        <div className={ css.container }>
            <Link to={ '/' }>
                { name }
            </Link>
        </div>
    );
};

export default React.memo(HeaderStoreName);