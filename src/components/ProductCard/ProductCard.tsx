import {
    Product,
} from '@vanyamate/market-place-service/services/storage-services/product/product.type.ts';
import React from 'react';
import css from './ProductCard.module.scss';


export type ProductCardProps = {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { product } = props;
    return (
        <div className={ css.container }>
            <img src={ product.image_url } className={ css.image }
                 alt={ product.product_name }/>
            <p className={ css.barcode }>{ product.barcode }</p>
            <p className={ css.category }>{ product.category }</p>
            <p className={ css.title }>{ product.product_name }</p>
            <p className={ css.description }>{ product.description }</p>
            <p className={ css.price }>${ product.price }</p>
        </div>
    );
};

export default ProductCard;