import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../styles/logindialog.css'; // Đường dẫn đến file CSS của bạn
import nguoidungService from '../services/userService'; // Đường dẫn đến service của bạn
import khachhangService from '../services/khachangService';
import { useNavigate } from 'react-router-dom';


function LoginDialog({ isDialogVisible, toggleDialog }) {
    const [isLogin, setIsLogin] = useState(true); // Điều khiển giữa Login và Register
    const [username, setUsername] = useState(''); // Tên đăng nhập
    const [password, setPassword] = useState(''); // Mật khẩu
    const navigate = useNavigate(); // Dùng để điều hướng trang

    const handleSwitch = () => {
    setIsLogin(!isLogin); // Chuyển giữa Login và Register
    };


    const getInformationCustomer = async (id) => {
        khachhangService.getByNguoiDungId(id)
            .then(res => {
                if (res.length > 0) {
                    localStorage.setItem('customer', JSON.stringify(res[0]))
                    navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
                }
            })
    }

    const handleLogin = async () => {
        if (username === '' || password === '') {
            alert('Thông tin không được để trống !')
            return
        }
        nguoidungService.login(username, password).then(d =>{
            if (d.token) {
                alert('Đăng nhập thành công !')
                getInformationCustomer(d.id)
            }
            else {
                alert('Sai tài khoản hoặc mật khẩu !')
            }
            localStorage.setItem('token', JSON.stringify(d.token))
            // localStorage.setItem('user', JSON.stringify(d))
        })
        toggleDialog(); // Đóng dialog sau khi đăng nhập thành công
    }

    const handleRegister = async () => {
        if (username === '' || password === '') {
            alert('Thông tin không được để trống !')
            return
        }
        nguoidungService.register({
            id: '',
            email_nguoi_dung: username,
            mat_khau_nguoi_dung: password,
            ma_loai_nguoi_dung: 1,
            create_at: '',
            update_at: ''
        }).then(res => {
            if (res.ok) {
                alert('Đăng kí thành công !')
                navigate('/')
            }
            else {
                alert('Đăng ký thất bại !')
            }
        })
    }


    return (
    <Dialog
        visible={isDialogVisible}
        style={{ width: '400px' }}
        header={isLogin ? 'Đăng nhập' : 'Đăng ký'}
        modal
        onHide={toggleDialog}
        className='login-dialog'
    >
    <div className="p-fluid">
        <div className="p-field">
            <label htmlFor="username">Tên đăng nhập</label>
            <input id="username" type="text" className="p-inputtext p-component" 
                value={username} onChange={e => setUsername(e.target.value)}
            />
        </div>

        <div className="p-field">
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" type="password" className="p-inputtext p-component" 
                value={password} onChange={e => setPassword(e.target.value)}
            />
        </div>

        {isLogin ? (
            <Button label="Đăng nhập" icon="pi pi-sign-in" onClick={handleLogin} />
        ) : (
            <Button label="Đăng ký" icon="pi pi-user-plus" onClick={handleRegister} />
        )}

        <div className="p-mt-2">
            <span onClick={handleSwitch} style={{ color: '#007BFF', cursor: 'pointer' }}>
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay!' : 'Đã có tài khoản? Đăng nhập!'}
            </span>
        </div>
        </div>
    </Dialog>
    );
}

export default LoginDialog;
