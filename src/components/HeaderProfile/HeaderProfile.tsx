import { PublicUser } from '@vanyamate/market-place-service/storage.ts';
import { Skeleton } from 'antd';
import React from 'react';
import HeaderProfileItem from './HeaderProfileItem.tsx';


export type HeaderProfileProps = {
    profile: PublicUser | null;
    loading: boolean;
}

const HeaderProfile: React.FC<HeaderProfileProps> = (props) => {
    const { loading, profile } = props;

    return (
        <div>
            {
                loading
                ? <Skeleton.Avatar active={ true } size={ 'large' }/>
                : profile ? <HeaderProfileItem avatar={ profile.avatar }
                                               login={ profile.login }/>
                          : 'No login'
            }
        </div>
    );
};

export default React.memo(HeaderProfile);