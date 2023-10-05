import {
    User,
} from '@vanyamate/market-place-service/services/storage-services/user/user.type.ts';
import { Skeleton } from 'antd';
import React from 'react';
import HeaderProfileItem from './HeaderProfileItem.tsx';


export type HeaderProfileProps = {
    profile: User | null;
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