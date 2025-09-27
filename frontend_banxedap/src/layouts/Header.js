
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Avatar} from 'primereact/avatar'
import {Badge} from 'primereact/badge'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // hoặc theme bạn dùng
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { useNavigate } from 'react-router-dom';
import { getTotalQuantity } from '../utils/cartUtils';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { useRef, useState } from 'react';
import khachhangService from '../services/khachangService';

export default function Header({toggleDialog}) {
    const menuRef = useRef(null); // Tạo ref cho menu
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng trang
    const [isProfileDialogVisible, setProfileDialogVisible] = useState(false); // Điều khiển hiển thị dialog thông tin người dùng
    const userData = JSON.parse( localStorage.getItem('customer')) || null; // Lấy thông tin người dùng từ localStorage
    const [ten_khach_hang, setTenKhachHang] = useState(userData?.ten_khach_hang || ''); // Tên khách hàng
    const [dia_chi_khach_hang, setDiaChiKhachHang] = useState(userData?.dia_chi_khach_hang || ''); // Địa chỉ khách hàng
    const [sdt_khach_hang, setSdtKhachHang] = useState(userData?.sdt_khach_hang || ''); // Số điện thoại khách hàng
    
    const cartCount = getTotalQuantity(); // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage

    const items = [
        {label: 'Trang chủ', icon: 'pi pi-home', link:'/'},
        {label: 'Sản phẩm', icon: 'pi pu-tags', link:'/product'},
        {label: 'Liên hệ', icon: 'pi pi-phone'},
    ]

    const handleKeyDown = (e) => {
        // Nếu nhấn Enter, thực hiện tìm kiếm
        if (e.key === 'Enter') {
            const value = e.target.value;
            navigate('/product?search=' + encodeURIComponent(value));
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token'); // Xóa token khỏi localStorage
        localStorage.removeItem('customer'); // Xóa thông tin người dùng khỏi localStorage
        navigate('/'); // Điều hướng về trang chủ
    }
    
    const handleOpenProfile = () => {
        setProfileDialogVisible(true); // Mở dialog thông tin người dùng
    }

    const handleCloseProfile = () => {
        setProfileDialogVisible(false); // Đóng dialog thông tin người dùng
    }

    const getInformationCustomer = async (id) => {
        khachhangService.getByNguoiDungId(id)
            .then(res => {
                if (res.length > 0) {
                    localStorage.setItem('customer', JSON.stringify(res[0]))
                    navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
                }
            })
    }

    const handleUpdateProfile = async () => {
        // Cập nhật thông tin người dùng
        const updatedUser = {
            ...userData,
            ten_khach_hang: ten_khach_hang,
            dia_chi_khach_hang: dia_chi_khach_hang,
            sdt_khach_hang: sdt_khach_hang
        }
        
        khachhangService.update(updatedUser).then(res => {
            if (res) {
                alert('Cập nhật thông tin thành công !')
                getInformationCustomer(updatedUser.ma_nguoi_dung); // Lấy lại thông tin người dùng sau khi cập nhật
                setProfileDialogVisible(false); // Đóng dialog sau khi cập nhật thành công
                navigate('/'); // Điều hướng về trang chủ
            }
        })
    }

    const profileItems = [
        {label: 'Thông tin cá nhân', icon: 'pi pi-user', command: handleOpenProfile},
        {label: 'Đăng xuất', icon: 'pi pi-sign-out', command: handleLogout}, // Thêm sự kiện đăng xuất
    ]

    return (
        <div className='header-container'>
            <div className='header-left'>
                <img src="images/HAlogo.png" alt="logo" className="header-logo" />
            </div>
            <div className='header-center'>
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className='nav-item'
                        onClick={() => {navigate(item.link)}}>
                            {item.label}
                    </div>
                ))}
            </div>
            <div className='header-search p-input-icon-left'>
                    <i 
                        className="pi pi-search" 
                    />
                    <InputText placeholder='Tìm kiếm sản phẩm ...' 
                    onKeyDown={handleKeyDown}
                    />
                </div>
            <div className='header-right'>
                <div className='header-cart'>
                    <Button 
                        icon="pi pi-shopping-cart" 
                        className="p-button-secondary" 
                        label="Giỏ hàng" 
                        onClick={() => navigate('/cart')}
                    />
                    {cartCount > 0 && <Badge value={cartCount} severity="danger" className="cart-badge" />}
                </div>
                <div className='header-user'>
                    {userData ? (
                        <div className="user-info"
                            onMouseEnter={(e) => menuRef.current.toggle(e)}>
                            <Avatar image={userData.avatar || 'images/avatar.jpg'} shape="circle" size="large" />
                            <span className="user-name">{userData.ten_khach_hang}</span>
                            <Menu model={profileItems} popup ref={menuRef} />
                        </div>
                    ) : (
                        <Button 
                            icon="pi pi-user" 
                            className="p-button-secondary" 
                            label="Đăng nhập"
                            onClick={toggleDialog} // Mở dialog đăng nhập
                        />
                    )}
                </div>
            </div>
            <Dialog 
                header="Thông tin cá nhân"
                visible={isProfileDialogVisible}
                modal
                onHide={handleCloseProfile}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Tên</label>
                        <InputText id="name" value={ten_khach_hang} onChange={(e) => setTenKhachHang(e.target.value)} />
                    </div>
                    <br/>
                    <div className="p-field">
                        <label htmlFor="address">Địa chỉ</label>
                        <InputText id="address" value={dia_chi_khach_hang} onChange={(e) => setDiaChiKhachHang(e.target.value)}/>
                    </div>
                    <br/>
                    <div className="p-field">
                        <label htmlFor="phone">Số điện thoại</label>
                        <InputText id="phone" value={sdt_khach_hang} onChange={(e) => setSdtKhachHang(e.target.value)} />
                    </div>
                    <br/>
                    <div className="p-field">
                        <label htmlFor="create_at">Ngày tạo</label>
                        <InputText id="create_at" value={userData?.create_at} disabled style={{color:'black'}}/>
                    </div>
                    <br/>
                    <div className="p-field">
                        <label htmlFor="update_at">Ngày sửa</label>
                        <InputText id="update_at" value={userData?.update_at} disabled style={{color:'black'}}/>
                    </div>
                    <br/>
                    <Button label="Lưu thay đổi" icon="pi pi-save" className="p-mt-2" 
                        onClick={handleUpdateProfile}                    
                    />
                </div>
            </Dialog>

        </div>
    );
}