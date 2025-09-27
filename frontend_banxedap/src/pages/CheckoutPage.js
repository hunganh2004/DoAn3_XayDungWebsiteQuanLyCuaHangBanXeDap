import { useState } from 'react'
import { Button } from 'primereact/button';
import '../styles/checkoutpage.css'
import { getTotalPrice} from '../utils/cartUtils'
import { useNavigate } from 'react-router-dom';
import donhangService from '../services/donhangService';
import chitietdonhangService from '../services/chitietdonhangService';

export default function CheckoutPage() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const customer = JSON.parse( localStorage.getItem('customer')) || null;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        ten_nguoi_nhan: '',
        email_nguoi_nhan: '',
        sdt_nguoi_nhan: '',
        dia_chi_nguoi_nhan: '',
        ghi_chu: '',
        tong_tien: 0,
        ma_khach_hang: null,
        ma_trang_thai: 1
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrder = async () => {
        try {
            const res = await donhangService.addNew({
                ...formData,
                ma_khach_hang: customer ? customer.id : null,
                tong_tien: getTotalPrice(cartData),
            })
            return res?.id; // Trả về ID của đơn hàng mới tạo
        }
        catch (error) {
            console.error('Error adding order:', error);
            return null;
        }
    }

    const handleAddOrderDetail = async (orderId) => {
        
        console.log("Cart data trước khi tạo orderDetails:", cartData);
        console.log("Order ID:", orderId);
        const orderDetails = cartData.map(item => ({
            id:'',
            so_luong: item.so_luong,
            ma_san_pham: item.id,
            ma_don_hang: orderId
        }));
        orderDetails.map(async detail => {
            try {
                await chitietdonhangService.addNew([detail]);
            } catch (error) {
                console.error("Lỗi khi thêm chi tiết đơn hàng:", error);
            }
        })
        
    }

    const handleSubmit = async () => {
        if ( !formData.ten_nguoi_nhan || !formData.email_nguoi_nhan || !formData.sdt_nguoi_nhan || !formData.dia_chi_nguoi_nhan) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        if (cartData.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        
        const newOderId =  await handleAddOrder(); // Thêm đơn hàng mới
        if (newOderId) {
            await handleAddOrderDetail(newOderId); // Thêm chi tiết đơn hàng
            alert('Cảm ơn, đơn hàng của bạn đã được đặt !');
            localStorage.removeItem('cart');
            navigate('/'); // Điều hướng về trang chủ sau khi đặt hàng thành công
        }
        else {
            alert('Đã có lỗi xảy ra trong quá trình đặt hàng!');
        }
    }

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2>Thông tin khách hàng</h2>
                <input
                    type='text'
                    name='ten_nguoi_nhan'
                    placeholder='Tên người nhận'
                    value={formData.ten_nguoi_nhan}
                    onChange={handleChange}
                />
                <input
                    type='email'
                    name='email_nguoi_nhan'
                    placeholder='Email người nhận'
                    value={formData.email_nguoi_nhan}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='sdt_nguoi_nhan'
                    placeholder='Số điện thoại người nhận'
                    value={formData.sdt_nguoi_nhan}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='dia_chi_nguoi_nhan'
                    placeholder='Địa chỉ người nhận'
                    value={formData.dia_chi_nguoi_nhan}
                    onChange={handleChange}
                />
                <textarea
                    name='ghi_chu'
                    placeholder='Ghi chú'
                    value={formData.ghi_chu}
                    onChange={handleChange}
                ></textarea>
                <Button label="Xác nhận đặt hàng" onClick={handleSubmit} className="p-button-success mt-3" />
            </div>
            <div className='checkout-summary'>
                <h2>Đơn hàng của bạn</h2>
                {cartData.length === 0 ? (<p>Không có sản phẩm nào trong giỏ hàng</p>):
                (<>
                    {cartData.map((item) => (
                        <div key={item.id} className='summary-item'>
                            <p>{item.ten_san_pham} x {item.so_luong}</p>
                            <div>{(item.gia_ban * item.so_luong).toLocaleString()} VNĐ</div>
                        </div>
                    ))}
                    {/* Tổng tiền */}
                    <div className='summary-total'>
                        <p>Tổng cộng:</p>
                        <div>{getTotalPrice(cartData).toLocaleString()} VNĐ</div>
                    </div>
                </>)}
            </div>
        </div>
    )
}