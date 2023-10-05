import {
    StorageName,
} from '@vanyamate/market-place-service/config/storage-names.config.ts';
import {
    StorageService,
} from '@vanyamate/market-place-service/services/common-services/storage/storage.service.ts';
import {
    CategoriesStorageService,
} from '@vanyamate/market-place-service/services/storage-services/categories/categories-storage.service.ts';
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
    ProductsStorageService,
} from '@vanyamate/market-place-service/services/storage-services/products/products-storage.service.ts';
import {
    IProductsService,
} from '@vanyamate/market-place-service/services/storage-services/products/products.interface.ts';
import React from 'react';
import { useMemo } from 'react';
import HeaderProductSearch
    from '../HeaderProductSearch/HeaderProductSearch.tsx';
import HeaderStoreName from '../HeaderStoreName/HeaderStoreName.tsx';
import css from './Header.module.scss';
import categories
    from '@vanyamate/market-place-service/data/categories/categories.json';
import products_1
    from '@vanyamate/market-place-service/data/products/products_1.json';
import products_2
    from '@vanyamate/market-place-service/data/products/products_2.json';


const Header = () => {
    const categoriesService: ICategoriesService<Category> = useMemo(() => {
        return new CategoriesStorageService<Category>(
            new StorageService(
                localStorage,
                StorageName.CATEGORIES,
            ),
            {
                options: {
                    items        : categories,
                    findOneFilter: (category: Category, title: string) => category.title === title,
                },
            },
        );
    }, []);

    const productsService: IProductsService<Product> = useMemo(() => {
        return new ProductsStorageService<Product>(
            new StorageService(
                localStorage,
                StorageName.PRODUCTS,
            ),
            {
                options: {
                    items        : [ ...products_1, ...products_2 ].flat(1),
                    findOneFilter: (product: Product, id: string) => product.barcode === Number(id),
                },
            },
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