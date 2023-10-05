import {
    Product,
} from '@vanyamate/market-place-service/services/storage-services/product/product.type.ts';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard.tsx';
import css from './ProductList.module.scss';


export type ProductListProps = {
    list: Product[]
}

const ProductList: React.FC<ProductListProps> = (props) => {
    return (
        <div className={ css.container }>
            { props.list.map((product) => <ProductCard key={ product.barcode }
                                                       product={ product }/>) }
        </div>
    );
};

export default ProductList;