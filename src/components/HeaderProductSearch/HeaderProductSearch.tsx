import { Input, Select } from 'antd';
import React from 'react';
import {
    ICategoriesService,
    IProductsService,
    Product,
    Category,
} from '@vanyamate/market-place-service';
import css from './HeaderProductSearch.module.scss';


export type HeaderProductSearchProps = {
    categoriesService: ICategoriesService<Category>,
    productsService: IProductsService<Product>
}

const HeaderProductSearch: React.FC<HeaderProductSearchProps> = () => {
    return (
        <div className={ css.container }>
            <Select>

            </Select>
            <Input/>
        </div>
    );
};

export default React.memo(HeaderProductSearch);