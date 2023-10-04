import { Divider, Dropdown, Input, Select } from 'antd';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    ICategoriesService,
    IProductsService,
    Product,
    Category,
} from '@vanyamate/market-place-service';
import css from './HeaderProductSearch.module.scss';
import type { MenuProps } from 'antd';


const { Search } = Input;


export type HeaderProductSearchProps = {
    categoriesService: ICategoriesService<Category>,
    productsService: IProductsService<Product>
}

const HeaderProductSearch: React.FC<HeaderProductSearchProps> = (props) => {
    const { categoriesService, productsService } = props;
    const [ categories, setCategories ]          = useState<Category[]>([]);
    const [ products, setProducts ]              = useState<Product[]>([]);
    const [ search, setSearch ]                  = useState<string>('');
    const [ activeCategory, setActiveCategory ]  = useState<string | null>(null);
    const categoryOptions                        = useMemo<{
        value: string,
        label: string
    }[]>(() => {
        return [
            {
                value: '',
                label: 'All categories',
            },
            ...categories.map((category) => ({
                value: category.title,
                label: category.title,
            })),
        ];
    }, [ categories ]);

    const productsOptions = useMemo<MenuProps['items']>(() => {
        console.log('products options', products);
        return products.map((product) => ({
            key  : product.barcode.toString(),
            label: (<div>{ product.product_name }</div>),
        }));
    }, [ products ]);

    useEffect(() => {
        if (search) {
            const filter: Partial<Product> = {
                product_name: search,
            };
            if (activeCategory) {
                filter.category = activeCategory;
            }
            productsService
                .findMany(filter, {
                    limit: 10,
                })
                .then((response) => response.list)
                .then((products) => setProducts(products));
        }
    }, [ search, activeCategory ]);

    useEffect(() => {
        categoriesService
            .findMany({}, { limit: 30 })
            .then((response) => response.list)
            .then((categories) => setCategories(categories));
    }, []);

    const onCategoryChange = useCallback((category: string) => {
        setActiveCategory(category ?? null);
    }, [ activeCategory ]);

    const onSearchChange = useCallback((search: string) => {
        setSearch(search);
    }, [ search ]);

    return (
        <Dropdown
            menu={ { items: productsOptions } }
            trigger={ [ 'hover' ] }
        >
            <div className={ css.container }>
                <Select
                    defaultValue={ '' }
                    onChange={ onCategoryChange }
                    options={ categoryOptions }
                    bordered={ false }
                    className={ css.select }
                    size={ 'large' }
                />
                <Divider type={ 'vertical' } orientation={ 'center' }/>
                <Search
                    placeholder={ 'Search for your products' }
                    bordered={ false }
                    onSearch={ onSearchChange }
                    size={ 'large' }
                    className={ css.search }
                />
            </div>
        </Dropdown>
    );
};

export default React.memo(HeaderProductSearch);