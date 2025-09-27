
import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Panel } from 'primereact/panel';
import '../styles/Dashboard.css'; // Import CSS
export default function Dashboard() {
    const stats = [
    { title: 'Tổng đơn hàng', value: '1,250', icon: 'pi pi-shopping-cart' },
    { title: 'Tổng doanh thu', value: '250M VNĐ', icon: 'pi pi-dollar' },
    { title: 'Khách hàng mới', value: '320', icon: 'pi pi-users' },
    ];
    const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
        label: 'Doanh thu',
        backgroundColor: '#4CAF50',
        data: [5000, 7000, 8000, 6500, 9000, 7500],
        },
    ],
    };
    const pieData = {
    labels: ['Hoa hồng', 'Hoa ly', 'Hoa lan', 'Hoa cúc'],
    datasets: [
        {
        data: [45, 25, 15, 15],
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        },
    ],
    };
    return (
    <div className='dashboard-container'>
      {/* Thống kê tổng quan */}
        <div className='stats-container'>
        {stats.map((item, index) => (
            <Card key={index} className='stat-card'>
            <div className='stat-content'>
                <i className={`${item.icon} stat-icon`} />
                <div>
                <h2 className='stat-title'>{item.title}</h2>
                <p className='stat-value'>{item.value}</p>
                </div>
            </div>
            </Card>
        ))}
        </div>
      {/* Biểu đồ doanh thu */}
        <Panel header='Doanh thu theo tháng' className='chart-panel'>
        <Chart type='bar' data={barData} style={{ width: '50%', height: '300px', margin: 'auto' }}/>
        </Panel>
      {/* Biểu đồ tròn về sản phẩm */}
        <Panel header='Tỷ lệ sản phẩm bán chạy' className='chart-panel'>
        <Chart type='pie' data={pieData} style={{ width: '50%', height: '300px', margin: 'auto' }}/>
        </Panel>
    </div>
    );
}