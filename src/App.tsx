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
import {
    UserStorageService,
} from '@vanyamate/market-place-service/services/storage-services/user/user-storage.service.ts';
import {
    UserDataGenerator,
} from '@vanyamate/market-place-service/services/storage-services/user/user.data-generator.ts';
import {
    IUserService,
} from '@vanyamate/market-place-service/services/storage-services/user/user.interface.ts';
import {
    CreateUserDto, UpdateUserDto,
    User,
} from '@vanyamate/market-place-service/services/storage-services/user/user.type.ts';
import { useEffect, useMemo, useState } from 'react';
import Content from './components/Content/Content.tsx';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import css from './App.module.scss';
import categories
    from '@vanyamate/market-place-service/data/categories/categories.json';
import products_1
    from '@vanyamate/market-place-service/data/products/products_1.json';
import products_2
    from '@vanyamate/market-place-service/data/products/products_2.json';


const App = () => {
    const [ profile, setProfile ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    const headerProfileData = useMemo(() => ({
        profile, loading,
    }), [ profile, loading ]);

    useEffect(() => {
        const userService: IUserService<User, CreateUserDto, UpdateUserDto> = new UserStorageService<User, CreateUserDto, UpdateUserDto>(
            new StorageService(
                localStorage,
                'users',
            ),
            new UserDataGenerator(),
            {
                options: {
                    timeout: 2000,
                    pk     : 'login',
                },
            },
        );

        setLoading(true);
        userService
            .read('admin')
            .then((user: User | null) => setProfile(user))
            .finally(() => setLoading(false));
    }, []);

    const categoriesService: ICategoriesService<Category> = useMemo(() => {
        return new CategoriesStorageService<Category>(
            new StorageService(
                localStorage,
                StorageName.CATEGORIES,
            ),
            {
                options: {
                    timeout      : 0,
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
                    timeout      : 100,
                    items        : [ ...products_1, ...products_2 ].flat(1),
                    findOneFilter: (product: Product, id: string) => product.barcode === Number(id),
                },
            },
        );
    }, []);

    return (
        <div className={ css.container }>
            <Header
                productsService={ productsService }
                categoriesService={ categoriesService }
                profile={ headerProfileData }
            />
            <Content/>
            <Footer/>
        </div>
    );
};

export default App;