import {
    ICategoriesService,
} from '@vanyamate/market-place-service/services/storage-services/categories/categories.interface.ts';
import {
    Category,
} from '@vanyamate/market-place-service/services/storage-services/category/category.type.ts';
import {
    Product,
} from '@vanyamate/market-place-service/services/storage-services/product/product.type.ts';
import {
    IProductsService,
} from '@vanyamate/market-place-service/services/storage-services/products/products.interface.ts';
import {
    User,
} from '@vanyamate/market-place-service/services/storage-services/user/user.type.ts';
import React from 'react';
import HeaderProductSearch
    from '../HeaderProductSearch/HeaderProductSearch.tsx';
import HeaderProfile from '../HeaderProfile/HeaderProfile.tsx';
import HeaderStoreName from '../HeaderStoreName/HeaderStoreName.tsx';
import css from './Header.module.scss';


export type HeaderProps = {
    profile: {
        profile: User | null,
        loading: boolean
    },
    categoriesService: ICategoriesService<Category>,
    productsService: IProductsService<Product>
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className={ css.container }>
            <div className={ css.left }>
                <HeaderStoreName name={ 'MateStore' }/>
                <HeaderProductSearch
                    categoriesService={ props.categoriesService }
                    productsService={ props.productsService }
                />
            </div>
            <div className={ css.right }>
                <HeaderProfile { ...props.profile }/>
            </div>
        </div>
    );
};

export default React.memo(Header);