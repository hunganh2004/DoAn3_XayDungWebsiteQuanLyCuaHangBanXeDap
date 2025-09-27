
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';
import { color } from 'chart.js/helpers';
export default function Header() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [list_expanded, setList_expanded] = useState([true, false])
    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/')
    }
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const panelMenuItems = [
        {
            label: 'Thống kê',
            icon: 'pi pi-chart-scatter',
            command: () => navigate('/dashboard')
        },
        {
            label: 'Bảng dữ liệu',
            items: [
                // {
                //     label: 'Anhsanpham',
                //     icon: 'pi pi-fw pi-table',
                //     command: () => navigate('/anhsanpham')
                // },
                {
                    label: 'Nhà cung cấp',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/nhacungcap')
                },
                {
                    label: 'Hãng sản xuất',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/hangsanxuat')
                },
                {
                    label: 'Loại sản phẩm',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/loaisanpham')
                },
                {
                    label: 'Sản phẩm',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/sanpham')
                },
                {
                    label: 'Loại người dùng',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/loainguoidung')
                },
                {
                    label: 'Tài khoản',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/nguoidung')
                },
                {
                    label: 'Nhân viên',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/nhanvien')
                },
                {
                    label: 'Khách hàng',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/khachhang')
                },
                {
                    label: 'Đơn hàng',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/donhang')
                },
                // {
                //     label: 'Chi tiết đơn hàng',
                //     icon: 'pi pi-fw pi-table',
                //     command: () => navigate('/chitietdonhang')
                // },
                {
                    label: 'Trạng thái đơn hàng',
                    icon: 'pi pi-fw pi-table',
                    command: () => navigate('/trangthaidonhang')
                },
                // {
                //     label: 'Khuyến mại',
                //     icon: 'pi pi-fw pi-table',
                //     command: () => navigate('/khuyenmai')
                // },
                // {
                //     label: 'Lô hàng',
                //     icon: 'pi pi-fw pi-table',
                //     command: () => navigate('/lohang')
                // },
            ],
            expanded: list_expanded[0],
            command: () => setList_expanded(list_expanded.map(e => !e))
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Thông tin cá nhân',
                    icon: 'pi pi-ellipsis-v'
                },
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                }
            ],
            expanded: list_expanded[1],
            command: () => setList_expanded(list_expanded.map(e => !e))
        },
        {
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out',
            command: logout
        }
    ]
    return(
        <header className='header'>
            <Sidebar 
            visible={visibleLeft} 
            onHide={() => setVisibleLeft(false)} 
            baseZIndex={1000}
            >
                <div style={{display: 'flex', justifyContent:'center'}}>
                <img src='/boy.png' 
                style={{
                    width:'150px', 
                    border:'1px solid blue', 
                    borderRadius:'50%'
                }}
                />
                </div>
                <h4 style={{ 
                    fontWeight: 'normal', 
                    textAlign:'center', 
                    overflowWrap:'break-word',
                    fontWeight: 'bold',
                    fontSize:'16px',
                    color: 'black'
                    }}>
                    {user.email_nguoi_dung}
                </h4>
                <PanelMenu 
                className='menu' 
                model={panelMenuItems} 
                style={{
                    fontSize:'20px'
                }}
                />
            </Sidebar>
            <h1 className='showSidebar'
            ><Button type='button' 
            icon='pi pi-bars'
            onClick={() => setVisibleLeft(true)} 
            style={{backgroundColor:'#7595b4'}}
            /></h1>
            <h1>Trang quản trị</h1>
            <h1 className='showSidebar'>
            <Button className='go_to_web' 
            icon='pi pi-home'
            style={{backgroundColor:'#7595b4'}}
            onClick={() => window.open('http://localhost:3002', '_blank')}
            />
            </h1>
        </header>
    )
}