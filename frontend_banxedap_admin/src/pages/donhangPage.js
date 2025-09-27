
import { useState, useEffect } from 'react';
import donhangService from '../services/donhangService'
import khachhangService from '../services/khachhangService';
import trangthaiService from '../services/trangthaidonhangService'
import chitietdonhangService from '../services/chitietdonhangService'
import sanphamService from '../services/sanphamService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
export default function DonhangPage() {
    const [list_Donhang, setList_Donhang] = useState([])
    const [list_tt, setList_tt] = useState([])
    const [list_kh, setList_kh] = useState([])
    const [list_billDetail, setList_billDetail] = useState([])
    const [list_sanpham, setList_sanpham] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [reload, setReload] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [nextPage, setNextPage] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const newItem = {
        id: '',
        ten_nguoi_nhan: '',
        email_nguoi_nhan: '',
        sdt_nguoi_nhan: '',
        dia_chi_nguoi_nhan: '',
        ghi_chu: '',
        tong_tien: '',
        ma_khach_hang: '',
        ma_trang_thai: '',
        create_at: '',
        update_at: '',
    }
    
    const [formData, setFormData] = useState(newItem)

    const columns = [
        {field: 'id', header: 'ID'},
        {field: 'ten_nguoi_nhan', header: 'Tên người nhận'},
        {field: 'san_pham', header: 'Sản phẩm', 
            body: (rowData) => {
                if (rowData?.san_pham !== undefined) {
                    return <div dangerouslySetInnerHTML={{__html: rowData.san_pham}}></div>
                }
            }
        },
        {field: 'tong_tien', header: 'Tổng tiền', 
            body: (rowData) => {
                if (rowData?.tong_tien !== undefined) {
                    return rowData.tong_tien.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
                }
            }
        },
        {field: 'ten_trang_thai', header: 'Trạng thái'},
        {field: 'email_nguoi_nhan', header: 'Email người nhận'},
        {field: 'sdt_nguoi_nhan', header: 'Số điện thoại người nhận'},
        {field: 'dia_chi_nguoi_nhan', header: 'Địa chỉ người nhận'},
        {field: 'ghi_chu', header: 'Ghi chú'},
        {field: 'ten_khach_hang', header: 'Tên khách hàng'},
        {field: 'create_at', header: 'Ngày tạo'},
        {field: 'update_at', header: 'Ngày sửa'},
    ]
    // Khi nhấn 'Sửa', mở form và điền dữ liệu vào
    const func_update = (rowData) => {
        setFormData(rowData);
        setShowForm(true);
    };
    // Khi nhấn 'Xóa', hiển thị cảnh báo
    const func_delete = (rowData) => {
        if (window.confirm(`Bạn có chắc muốn xóa ${rowData.ten_don_hang}?`)) {
            donhangService.deleteByID(rowData.id).then(() => {
                alert('Xóa thành công!');
            }).catch(err => console.error('Lỗi khi xóa:', err));
            setReload(!reload)
        }
    };
    // Khi nhấn 'Thêm mới', mở form trống
    const func_add = () => {
        setFormData({
        id: '',
        ten_nguoi_nhan: '',
        email_nguoi_nhan: '',
        sdt_nguoi_nhan: '',
        dia_chi_nguoi_nhan: '',
        ghi_chu: '',
        tong_tien: '',
        ma_khach_hang: '',
        ma_trang_thai: '',
        create_at: '',
        update_at: '',
        });
        setShowForm(true);
    };
    // Khi bấm 'Lưu' trong form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            donhangService.update([formData]).then(() => {
                alert('Cập nhật thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi cập nhật:', err));
        } else {
            donhangService.addNew([formData]).then(() => {
                alert('Thêm mới thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi thêm:', err));
        }
        setReload(!reload)
    };
    const func_search = (searchValue) => {
        setLoading(true)
        donhangService.getPaginationSearch(searchValue,pageSize,currentPage).then(d => {
            setList_Donhang(HandleData(d))
            if (d.length < pageSize) {
                setNextPage(false)
            }
            else{
                setNextPage(true)
            }
        }).catch(err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        }).finally(()=>{setLoading(false)})
    }
    const func_getPagination = () => {
        setLoading(true)
        donhangService.getPagination(pageSize,currentPage).then(d => {
            setList_Donhang(HandleData(d))
            if (d.length < pageSize) {
                setNextPage(false)
            }
            else{
                setNextPage(true)
            }
        }).catch(err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        }).finally(()=>{setLoading(false)})
    }
    function fillData() {
        const checkData = [...list_Donhang]
        while(checkData.length < pageSize) {
            checkData.push('')
        }
        setList_Donhang(checkData)
    }
    const HandleData = (list_Donhang) => {
        const data =  list_Donhang.map(sp => {
            const kh = list_kh.find(lsp => lsp.id === sp.ma_khach_hang)
            const tt = list_tt.find(hsx => hsx.id === sp.ma_trang_thai)
            //Tìm các chi tiết đơn hàng
            const detail = list_billDetail.filter(d => d.ma_don_hang === sp.id)
            //Tìm các sản phẩm trong chi tiết đơn hàng
            const list_san_pham = detail.map(d => {
                const san_pham = list_sanpham.find(p => p.id === d.ma_san_pham)
                return san_pham.ten_san_pham + ' x ' + d.so_luong
            })
            console.log('don hang', sp)
            console.log('list_billDetail', list_billDetail)
            console.log('detail', detail)
            console.log('list_san_pham', list_san_pham)

            return {
                ...sp,
                ten_khach_hang: kh ? kh.ten_khach_hang : '',
                ten_trang_thai: tt ? tt.ten_trang_thai : '',
                san_pham: list_san_pham ? list_san_pham.join('<br/>') : ''
            }
        })
        console.log(data)
        return data
    }
    useEffect(() => {
        if (list_billDetail && list_tt.length) {
            func_getPagination()
        }
    },[currentPage, pageSize, reload])
    useEffect(()=> {
        fillData()
    }, [list_Donhang.length])
    useEffect(()=> {
        khachhangService.getAll().then(d => {
            setList_kh(d)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
        trangthaiService.getAll().then(d => {
            setList_tt(d)
            setReload(!reload)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
        chitietdonhangService.getAll().then(d => {
            setList_billDetail(d)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
        sanphamService.getAll().then(d => {
            setList_sanpham(d)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
    }, [])
       // Nút chỉnh sửa
    const editButton = (rowData) => {
        if (rowData === '') return <button className='edit-btn'>X</button>
        return <Button className='edit-btn' label='' icon='pi pi-pencil' onClick={() => func_update(rowData)} style={{color: 'black'}}/>
    }
      // Nút xóa
    const deleteButton = (rowData) => {
        if (rowData === '') return <button className='delete-btn'>X</button>
        return <Button className='delete-btn' label='' icon='pi pi-trash' severity='danger' onClick={() => func_delete(rowData)} style={{color: 'black'}}/>
    }
    return (
        <>
        <div className='table-container'>
            <h1>{loading ? 'Đang tải dữ liệu... ':'Danh sách đơn hàng'}</h1>
            <div className='top-bar'>
                <button className='btn-add' onClick={() => func_add()} style={{visibility:'hidden'}}>Thêm mới</button>
                <iv className='search-container'>
                <button className='btn-search'><i className='pi pi-search'></i></button>
                <input
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='search-input'
                    value={searchValue}
                    onChange={(e) => {
                    setSearchValue(e.target.value)
                    func_search(searchValue)
                    }}
                />
                </iv>
            </div>
            <DataTable 
            value={list_Donhang} 
            className='custom-table'
            scrollable
            scrollHeight='flex'
            >
                <Column
                header='Sửa'
                body={editButton}
                style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap' }}
                ></Column>
                <Column
                header='Xóa'
                body={deleteButton}
                style={{ width: '100px', textAlign: 'center', whiteSpace: 'nowrap' }}
                ></Column>
                {columns.map((col, index) => (
                <Column 
                key={index} 
                field={col.field} 
                header={col.header} 
                body={col.body}
                sortable
                ></Column>
                ))}
            </DataTable>
            </div>
        {/* Phân trang */}
        <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                ← Trang trước
            </button>
            <div className='currentPage'>
                <p>Trang {currentPage}, kích thước</p>
                <input className='pageSize' 
                value={pageSize}
                onChange={(e)=> {setPageSize(e.target.value)}}>
                </input>
            </div>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!nextPage}>
                Trang sau →
            </button>
        </div>
        {/* Form thêm/sửa */}
        <Dialog header={formData.id ? 'Chỉnh sửa Donhang' : 'Thêm Donhang'} 
        visible={showForm} 
        style={{textAlign:'center'}} 
        onHide={() => setShowForm(false)}
        >
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label>ID:</label>
                <InputText
                    type='text'
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    disabled
                />
                <label>Tên người nhận:</label>
                <InputText
                    type='text'
                    value={formData.ten_nguoi_nhan}
                    onChange={(e) => setFormData({ ...formData, ten_nguoi_nhan: e.target.value })}
                    required
                />
                <label>Email người nhận:</label>
                <InputText
                    type='text'
                    value={formData.email_nguoi_nhan}
                    onChange={(e) => setFormData({ ...formData, email_nguoi_nhan: e.target.value })}
                    required
                />
                <label>Số điện thoại người nhận:</label>
                <InputText
                    type='text'
                    value={formData.sdt_nguoi_nhan}
                    onChange={(e) => setFormData({ ...formData, sdt_nguoi_nhan: e.target.value })}
                    required
                />
                <label>Địa chỉ người nhận:</label>
                <InputText
                    type='text'
                    value={formData.dia_chi_nguoi_nhan}
                    onChange={(e) => setFormData({ ...formData, dia_chi_nguoi_nhan: e.target.value })}
                    required
                />
                <label>Ghi chú:</label>
                <InputText
                    type='text'
                    value={formData.ghi_chu}
                    onChange={(e) => setFormData({ ...formData, ghi_chu: e.target.value })}
                    required
                />
                <label>Tổng tiền:</label>
                <InputText
                    type='text'
                    value={formData.tong_tien}
                    onChange={(e) => setFormData({ ...formData, tong_tien: e.target.value })}
                    disabled
                />
                <label>Danh sách sản phẩm:</label>
                <InputTextarea
                    rows={5}
                    cols={50}
                    value={formData?.san_pham?.replace(/<br\s*\/?>/gi, '\n')}
                    onChange={(e) => setFormData({ ...formData, san_pham: e.target.value })}
                    style={{color: 'black'}}
                    disabled
                />
                <label>Tên khách hàng:</label>
                <Dropdown 
                    value={list_kh.find(hsx => hsx.id === formData.ma_khach_hang)}
                    options={[{ id: '', ten_khach_hang: 'chọn khách hàng' }, ...list_kh]}
                    onChange={(e) => { 
                        setFormData({...formData, 
                            ma_khach_hang: e.value.id, 
                            ten_khach_hang: e.value.ten_khach_hang
                        })
                        
                    }}
                    optionLabel='ten_khach_hang'
                    placeholder='chọn khách hàng'
                    style={{width: '50%', textAlign:'left'}}
                    />
                <label>Trạng thái:</label>
                <Dropdown 
                    value={list_tt.find(hsx => hsx.id === formData.ma_trang_thai)}
                    options={list_tt}
                    onChange={(e) => { 
                        setFormData({...formData, 
                            ma_trang_thai: e.value.id, 
                            ten_trang_thai: e.value.ten_trang_thai
                        })
                        
                    }}
                    optionLabel='ten_trang_thai'
                    placeholder='chọn trạng thái'
                    style={{width: '50%', textAlign:'left'}}
                    />
                <label>Ngày tạo:</label>
                <InputText
                    type='text'
                    value={formData.create_at}
                    onChange={(e) => setFormData({ ...formData, create_at: e.target.value })}
                    disabled
                />
                <label>Ngày sửa:</label>
                <InputText
                    type='text'
                    value={formData.update_at}
                    onChange={(e) => setFormData({ ...formData, update_at: e.target.value })}
                    disabled
                />
                <button type='submit'>{formData.id ? 'Cập nhật' : 'Thêm mới'}</button>
                <button type='button' onClick={() => setShowForm(false)}>Hủy</button>
            </form>
        </div>
        </Dialog>
        </>
    )
}