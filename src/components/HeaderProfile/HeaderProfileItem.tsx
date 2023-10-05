import React from 'react';
import css from './HeaderProfileItem.module.scss';


export type HeaderProfileItemProps = {
    avatar: string;
    login: string;
}

const HeaderProfileItem: React.FC<HeaderProfileItemProps> = (props) => {
    const { avatar, login } = props;
    return (
        <div className={ css.container }>
            <img
                src={ avatar ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' }
                alt={ login } className={ css.avatar }/>
            <p className={ css.login }>{ login }</p>
        </div>
    );
};

export default HeaderProfileItem;