import {
    User,
} from '@vanyamate/market-place-service/services/storage-services/user/user.type.ts';
import { Skeleton } from 'antd';
import React from 'react';


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
                : <div>{ profile ? profile.login : 'No login' }</div>
            }
        </div>
    );
};

export default React.memo(HeaderProfile);