import React from 'react';
import {
    Category,
    ICategoriesService,
    CategoriesService,
    StorageService,
    StorageName, IProductsService, Product,
    ProductsLocalService,
} from '@vanyamate/market-place-service';
import categories
    from '@vanyamate/market-place-service/data/categories/categories.json';
import products_1
    from '@vanyamate/market-place-service/data/products/products_1.json';
import products_2
    from '@vanyamate/market-place-service/data/products/products_2.json';
import { useMemo } from 'react';
import HeaderProductSearch
    from '../HeaderProductSearch/HeaderProductSearch.tsx';
import HeaderStoreName from '../HeaderStoreName/HeaderStoreName.tsx';
import css from './Header.module.scss';


const Header = () => {
    const categoriesService: ICategoriesService<Category> = useMemo(() => {
        return new CategoriesService(
            new StorageService(
                localStorage,
                StorageName.CATEGORIES,
            ),
            categories,
        );
    }, []);

    const productsService: IProductsService<Product> = useMemo(() => {
        return new ProductsLocalService(
            new StorageService(
                localStorage,
                StorageName.PRODUCTS,
            ),
            products_1,
            products_2,
        );
    }, []);

    return (
        <div className={ css.container }>
            <div className={ css.left }>
                <HeaderStoreName name={ 'MateStore' }/>
                <HeaderProductSearch
                    categoriesService={ categoriesService }
                    productsService={ productsService }
                />
            </div>
            <div className={ css.right }>
                elements
            </div>
        </div>
    );
};

export default React.memo(Header);