import React from 'react';
import { Category, ICategoriesService } from '@vanyamate/market-place-service';
import { useMemo } from 'react';
import HeaderStoreName from '../HeaderStoreName/HeaderStoreName.tsx';


const Header = () => {
    const categoriesService: ICategoriesService<Category> = useMemo(() => {

    }, []);

    return (
        <div>
            <div>
                <HeaderStoreName name={ 'MateStore' }/>
                <div>
                    search
                    <input/>
                </div>
            </div>
            <div>
                elements
            </div>
        </div>
    );
};

export default React.memo(Header);