import { useEffect, useMemo, useState } from 'react';
import Content from './components/Content/Content.tsx';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import css from './App.module.scss';
import {
    CreateUserDto,
    UpdateUserDto,
    User,
    UserDataGenerator,
    UserStorageService,
    ICategoriesService,
    Category,
    CategoriesStorageService,
    IProductsService,
    Product,
    ProductsStorageService,
    IAuthService,
    AuthStorageService, UserMapper, PublicUser,
} from '@vanyamate/market-place-service/storage.ts';
import {
    StorageName,
    StorageService,
} from '@vanyamate/market-place-service';
import {
    categories,
    product_2,
    product_1,
} from '@vanyamate/market-place-service/data.ts';


const App = () => {
    const [ profile, setProfile ] = useState<PublicUser | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    const profileData = useMemo(() => ({
        profile, loading,
    }), [ profile, loading ]);

    useEffect(() => {
        const authService: IAuthService<PublicUser> = new AuthStorageService(
            new UserStorageService<User, CreateUserDto, UpdateUserDto>(
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
            ),
            new UserMapper(),
            new StorageService(
                localStorage,
                '_market_ls-db_current-user',
            ),
        );

        setLoading(true);
/*        authService
            .login('admin', '321')
            .then((user: PublicUser) => setProfile(user))
            .finally(() => setLoading(false));*/

        authService
            .refresh()
            .then((user: PublicUser) => setProfile(user))
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
                    items        : [ ...product_2, ...product_1 ].flat(1),
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
                profile={ profileData }
            />
            <Content profile={ profileData }
                     productsService={ productsService }/>
            <Footer/>
        </div>
    );
};

export default App;