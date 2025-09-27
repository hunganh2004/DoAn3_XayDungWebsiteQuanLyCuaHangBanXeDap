
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import nguoidungservice from '../services/nguoidungService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
    const handleLogin = (e) => {
        if (username === '' || password === '') {
            alert('Thông tin không được để trống !')
            return
        }
        nguoidungservice.login(username, password).then(d =>{
            if (d.token) {
                alert('Đăng nhập thành công !')
                alert(d.token)
                navigate('/dashboard')
            }
            else {
                alert('Sai tài khoản hoặc mật khẩu !')
            }
            localStorage.setItem('token', JSON.stringify(d.token))
            localStorage.setItem('user', JSON.stringify(d))
        })
    }
    return (
        <div className='login'>
            <div className='login-container'>
                <div className='avatar'>
                    <img src='/boy.png'  alt='Image' height='100'/>
                    <div>Xin chào, quản trị viên !</div>
                    <div>Đăng nhập để tiếp tục</div>
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
                </div>
                <div className='remember'>
                    <div>
                        <Checkbox inputId='remember' 
                        checked={checked}
                        onChange={e => {setChecked(e.checked)}}/>
                        <label htmlFor='remember' >Nhớ thông tin</label>
                    </div>
                    {/* <Link to='/register' >Đăng ký ngay</Link> */}
                </div>
                <Button 
                label='Sign In' 
                className='submit'
                icon='pi pi-sign-in'
                onClick={handleLogin} />
            </div>
        </div>
    )
}