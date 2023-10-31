import {
    Product,
} from '@vanyamate/market-place-service/services/storage-services/product/product.type.ts';
import { Button } from 'antd';
import React from 'react';
import { ICheckbox } from '../../modules/ui/Checkbox/Checkbox.ts';
import Checkbox from '../ui/lgc/Checkbox/Checkbox.tsx';
import CheckboxModule from '../../modules/ui/Checkbox/Checkbox.ts';
import css from './ProductCard.module.scss';


export type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { product } = props;

    const checkbox: ICheckbox = new CheckboxModule(false);

    const click = function () {

    };

    return (
        <div className={ css.container }>
            <img src={ product.image_url } className={ css.image }
                 alt={ product.product_name } onClick={ () => checkbox.toggle() }/>
            <p className={ css.barcode }>{ product.barcode }</p>
            <p className={ css.category }>{ product.category }</p>
            <p className={ css.title }>{ product.product_name }</p>
            <p className={ css.description }>{ product.description }</p>
            <p className={ css.price }>${ product.price }</p>
            <Checkbox module={ checkbox }/>
            <Button onClick={ click }>Add To cart</Button>
        </div>
    );
};

export default ProductCard;