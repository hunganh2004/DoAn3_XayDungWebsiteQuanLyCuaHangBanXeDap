
import { useState, useEffect } from 'react';
import nguoidungService from '../services/nguoidungService'
import loainguoidungService from '../services/loainguoidungService';
import khachhangService from '../services/khachhangService'
import nhanvienService from '../services/nhanvienService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
export default function NguoidungPage() {
    const [list_Nguoidung, setList_Nguoidung] = useState([])
    const [list_loainguoidung, setList_loainguoidung] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [reload, setReload] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [nextPage, setNextPage] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const newItem = {
        id: '',
        email_nguoi_dung: '',
        mat_khau_nguoi_dung: '',
        ma_loai_nguoi_dung: '',
        create_at: '',
        update_at: '',
    }

    const [formData, setFormData] = useState(newItem)
    const imageTemplate = (rowData) => {
        if (!rowData || !rowData.anh_nguoi_dung) {
            return <img  className='product-image' />
        }
        return <img src={rowData.anh_nguoi_dung}  className='product-image' />;
    }
    const columns = [
        {field: 'id', header: 'ID'},
        {field: 'email_nguoi_dung', header: 'Email người dùng'},
        {field: 'ten_loai_nguoi_dung', header: 'Tên loại người dùng'},
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
        if (window.confirm(`Bạn có chắc muốn xóa ${rowData.ten_nguoi_dung}?`)) {
            nguoidungService.deleteByID(rowData.id).then((d) => {
                if (d.code) {
                    alert('Không thể xóa người dùng !')
                }
                alert('Xóa thành công!');
            }).catch(err => console.error('Lỗi khi xóa:', err));
            setReload(!reload)
        }
    };
    // Khi nhấn 'Thêm mới', mở form trống
    const func_add = () => {
        setFormData({
        id: '',
        email_nguoi_dung: '',
        mat_khau_nguoi_dung: '',
        ma_loai_nguoi_dung: '',
        create_at: '',
        update_at: '',
        });
        setShowForm(true);
    };
    // Khi bấm 'Lưu' trong form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            nguoidungService.update([formData]).then(() => {
                alert('Cập nhật thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi cập nhật:', err));
        } else {
            nguoidungService.addNew([formData]).then(() => {
                alert('Thêm mới thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi thêm:', err));
            
        }
        setReload(!reload)
    };
    const func_search = (searchValue) => {
        setLoading(true)
        nguoidungService.getPaginationSearch(searchValue,pageSize,currentPage).then(d => {
            setList_Nguoidung(HandleData(d))
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
        nguoidungService.getPagination(pageSize,currentPage).then(d => {
            setList_Nguoidung(HandleData(d))
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
    const HandleData = (list_Nguoidung) => {
        const data =  list_Nguoidung.map(sp => {
            const loaiSP = list_loainguoidung.find(lsp => lsp.id === sp.ma_loai_nguoi_dung)
            return {
                ...sp,
                ten_loai_nguoi_dung: loaiSP ? loaiSP.ten_loai_nguoi_dung : ''
            }
        })
        return data
    }
    function fillData() {
        const checkData = [...list_Nguoidung]
        while(checkData.length < pageSize) {
            checkData.push('')
        }
        setList_Nguoidung(checkData)
    }
    useEffect(() => {
        if (list_loainguoidung.length) {
            func_getPagination();
        }
    },[currentPage, pageSize, reload])
    useEffect(()=> {
        fillData()
    }, [list_Nguoidung.length])
    useEffect(() => {
        loainguoidungService.getAll().then(d => {
            setList_loainguoidung(d)
            setReload(!reload)
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
            <h1>{loading ? 'Đang tải dữ liệu... ':'Danh sách tài khoản'}</h1>
            <div className='top-bar'>
                <button className='btn-add' onClick={() => func_add()}>Thêm mới</button>
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
            value={list_Nguoidung} 
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
        <Dialog header={formData.id ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản'} 
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
                <label>Email người dùng:</label>
                <InputText
                    type='text'
                    value={formData.email_nguoi_dung}
                    onChange={(e) => setFormData({ ...formData, email_nguoi_dung: e.target.value })}
                    required
                />
                <label>Mật khẩu người dùng:</label>
                <InputText
                    type='text'
                    value={formData.mat_khau_nguoi_dung}
                    onChange={(e) => setFormData({ ...formData, mat_khau_nguoi_dung: e.target.value })}
                    required
                />
                <label>Loại người dùng:</label>
                <Dropdown 
                    value={list_loainguoidung.find(hsx => hsx.id === formData.ma_loai_nguoi_dung)}
                    options={list_loainguoidung}
                    onChange={(e) => { 
                        setFormData({...formData, 
                            ma_loai_nguoi_dung: e.value.id, 
                            ten_loai_nguoi_dung: e.value.ten_loai_nguoi_dung
                        })
                        
                    }}
                    optionLabel='ten_loai_nguoi_dung'
                    placeholder='chọn loại người dùng'
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