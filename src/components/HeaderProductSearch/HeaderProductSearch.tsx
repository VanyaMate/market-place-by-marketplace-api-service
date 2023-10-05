import { Divider, Dropdown, Empty, Input, Select } from 'antd';
import React, {
    ChangeEvent,
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
    const [ categoryOpened, setCategoryOpened ]  = useState<boolean>(false);
    const [ loading, setLoading ]                = useState<boolean>(false);
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
        return products.length ? products.map((product) => ({
            key  : product.barcode.toString(),
            label: (<div>{ product.product_name }</div>),
        })) : [ {
            key  : 'empty-key',
            label: <Empty/>,
        }];
    }, [ products ]);

    useEffect(() => {
        if (search.length > 2) {
            const filter: Partial<Product> = {
                product_name: search,
            };
            if (activeCategory) {
                filter.category = activeCategory;
            }
            setLoading(true);
            productsService
                .findMany(filter, {
                    limit: 10,
                    sort : [ 'product_name', 'asc' ],
                })
                .then((response) => response.list)
                .then((products) => setProducts(products))
                .finally(() => setLoading(false));
        } else {
            setProducts([]);
        }
    }, [ search, activeCategory ]);

    useEffect(() => {
        categoriesService
            .findMany({}, { limit: 30, sort: [ 'title', 'asc' ] })
            .then((response) => response.list)
            .then((categories) => setCategories(categories));
    }, []);

    const onCategoryChange = useCallback((category: string) => {
        setActiveCategory(category ?? null);
    }, [ activeCategory ]);

    const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, [ search ]);

    return (
        <Dropdown
            menu={ { items: productsOptions } }
            trigger={ [ 'hover' ] }
            disabled={ categoryOpened }
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
                    size={ 'large' }
                    className={ css.search }
                    enterButton={ true }
                    onChange={ onSearchChange }
                    loading={ loading }
                />
            </div>
        </Dropdown>
    );
};

export default React.memo(HeaderProductSearch);