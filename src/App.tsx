import Content from './components/Content/Content.tsx';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import css from './App.module.scss';


const App = () => {
    return (
        <div className={ css.container }>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
};

export default App;