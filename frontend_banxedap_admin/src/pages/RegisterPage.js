
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import nguoiDungService from '../services/nguoidungService'
import khachhangService from '../services/khachhangService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const navigate = useNavigate()
    const handleRegister = (e) => {
        if (username === '' || password === '' || repassword == '') {
            alert('Thông tin không được để trống !')
            return
        }
        if (password === repassword) {
            nguoiDungService.register({
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
        else {
            alert('Mật khẩu nhập lại không đúng !')
        }
    }
    return(
        <div className='login'>
                    <div className='login-container'>
                        <div className='avatar'>
                            <img src='/boy.png'  alt='Image' height='100'/>
                            <div>Đây là form đăng ký tài khoản !</div>
                        </div>
                        <div className='input'>
                                <label htmlFor='email'>Email</label>
                                <InputText 
                                inputId='email' 
                                type='text' 
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Địa chỉ email ...' 
                                />
                                <label htmlFor='password'>Password</label>
                                <Password 
                                inputId='password' 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Mật khẩu ...' 
                                toggleMask
                                />
                                <label htmlFor='repassword'>Password</label>
                                <Password 
                                inputId='repassword' 
                                value={repassword} 
                                onChange={e => setRepassword(e.target.value)}
                                placeholder='Mật khẩu ...' 
                                toggleMask
                                />
                        </div>
                        <div className='remember'>
                            <Link to='/'>Đăng nhập ngay</Link>
                        </div>
                        <Button 
                        label='Sign In' 
                        className='submit'
                        onClick={handleRegister} />
                    </div>
                </div>
    )
}