import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginDialog from './components/LoginDialog';
import NotFound from './pages/NotFound';
import './styles/App.css';
import './styles/header.css';
import './styles/footer.css';
import { useState } from 'react';
function App() {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const toggleDialog = () => {
    setDialogVisible(!isDialogVisible);
  }

  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<SetLayout 
            pageName="HomePage" 
            toggleDialog={toggleDialog}/>} 
          />
          <Route path="/product" element={<SetLayout 
            pageName="ProductPage" 
            toggleDialog={toggleDialog} />
          } />
          <Route path="/cart" element={<SetLayout 
            pageName="CartPage" 
            toggleDialog={toggleDialog} />
          } />
          <Route path="/checkout" element={<SetLayout 
            pageName="CheckoutPage" 
            toggleDialog={toggleDialog} />
          } />
          <Route path="*" element={<NotFound />
          } />
        </Routes>

        <LoginDialog isDialogVisible={isDialogVisible} toggleDialog={toggleDialog} />
    </div>
    </BrowserRouter>
  );
}

function SetLayout({pageName, toggleDialog}) {

  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey(prevKey => prevKey + 1);
  }

  const renderPage = () => {
    switch(pageName) {
      case 'HomePage':
        return <HomePage handleReload={handleReload} />;
      case 'ProductPage':
        return <ProductPage handleReload={handleReload} />;
      case 'CartPage':
        return <CartPage handleReload={handleReload} />;
      case 'CheckoutPage':
        return <CheckoutPage handleReload={handleReload} />;
      default:
        return <NotFound />;
    }
  }

  return (
    <>
    <div className='layout'>
      <Header key={reloadKey}  toggleDialog={toggleDialog}/>
      <div className='content'>
        {renderPage()}
      </div>
      <Footer />
    </div>
    </>
  );
}

export default App;
