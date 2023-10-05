import {
    Product,
} from '@vanyamate/market-place-service/services/storage-services/product/product.type.ts';
import {
    IProductsService,
} from '@vanyamate/market-place-service/services/storage-services/products/products.interface.ts';
import React, { useEffect, useState } from 'react';
import { ProfileStatus } from '../Header/Header.tsx';
import ProductList from '../ProductList/ProductList.tsx';


export type ContentProps = {
    productsService: IProductsService<Product>,
    profile: ProfileStatus;
}

const Content: React.FC<ContentProps> = (props) => {
    const { profile, productsService } = props;
    const [ products, setProducts ]    = useState<Product[]>([]);

    useEffect(() => {
        if (!profile.loading) {
            productsService
                .findMany({}, { limit: 30 })
                .then((response) => response.list)
                .then((products) => setProducts(products));
        }
    }, [ profile.loading ]);

    return (
        <div style={ { margin: '10px 0' } }>
            {
                profile.loading
                ? 'Loading..'
                : <ProductList list={ products }/>
            }
        </div>
    );
};

export default Content;