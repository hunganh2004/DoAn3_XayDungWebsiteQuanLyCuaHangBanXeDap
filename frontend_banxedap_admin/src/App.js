
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Dashboard from './pages/Dashboard';
import Settings from './pages/SettingPage';
import './styles/style.css'
import AnhsanphamPage from './pages/anhsanphamPage';
import ChitietdonhangPage from './pages/chitietdonhangPage';
import DonhangPage from './pages/donhangPage';
import HangsanxuatPage from './pages/hangsanxuatPage';
import KhachhangPage from './pages/khachhangPage';
import KhuyenmaiPage from './pages/khuyenmaiPage';
import LohangPage from './pages/lohangPage';
import LoainguoidungPage from './pages/loainguoidungPage';
import LoaisanphamPage from './pages/loaisanphamPage';
import NguoidungPage from './pages/nguoidungPage';
import NhacungcapPage from './pages/nhacungcapPage';
import NhanvienPage from './pages/nhanvienPage';
import SanphamPage from './pages/sanphamPage';
import TrangthaidonhangPage from './pages/trangthaidonhangPage';
function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<SetLayout page={<Dashboard />} />} />
        <Route path='/settings' element={<SetLayout page={<Settings />} />} />
        <Route path='*' element={<SetLayout page={<NotFound />}/>} />
        <Route path='/register' element={<RegisterPage />} />
        {/* <Route path='/anhsanpham' element={<SetLayout page={<AnhsanphamPage />} />} /> */}
        <Route path='/chitietdonhang' element={<SetLayout page={<ChitietdonhangPage />} />} />
        <Route path='/donhang' element={<SetLayout page={<DonhangPage />} />} />
        <Route path='/hangsanxuat' element={<SetLayout page={<HangsanxuatPage />} />} />
        <Route path='/khachhang' element={<SetLayout page={<KhachhangPage />} />} />
        <Route path='/khuyenmai' element={<SetLayout page={<KhuyenmaiPage />} />} />
        <Route path='/lohang' element={<SetLayout page={<LohangPage />} />} />
        <Route path='/loainguoidung' element={<SetLayout page={<LoainguoidungPage />} />} />
        <Route path='/loaisanpham' element={<SetLayout page={<LoaisanphamPage />} />} />
        <Route path='/nguoidung' element={<SetLayout page={<NguoidungPage />} />} />
        <Route path='/nhacungcap' element={<SetLayout page={<NhacungcapPage />} />} />
        <Route path='/nhanvien' element={<SetLayout page={<NhanvienPage />} />} />
        <Route path='/sanpham' element={<SetLayout page={<SanphamPage />} />} />
        <Route path='/trangthaidonhang' element={<SetLayout page={<TrangthaidonhangPage />} />} />
    </Routes>
    </>
      
  );
}
function SetLayout({page}) {
  return(
    <>
    <div className='admin-layout'>
      <div className='main-content'>
        <Header />
        <div className='page-content'>
          {page}
        </div>
        {/* {<Footer />} */}
      </div>
    </div>
    </>
  )
}
export default App;