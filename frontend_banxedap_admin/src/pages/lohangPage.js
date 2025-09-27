
import { useState, useEffect } from 'react';
import lohangService from '../services/lohangService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
export default function LohangPage() {
    const [list_Lohang, setList_Lohang] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [reload, setReload] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [nextPage, setNextPage] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const newItem = {
        id: '',
        so_luong_nhap: '',
        so_luong_da_ban: '',
        so_luong_doi_tra: '',
        so_luong_hien_tai: '',
        gia_nhap: '',
        gia_ban: '',
        ma_san_pham: '',
        create_at: '',
        update_at: '',
    }
    const [formData, setFormData] = useState(newItem)
    const imageTemplate = (rowData) => {
        if (!rowData || !rowData.anh_lo_hang) {
            return <img  className='product-image' />
        }
        return <img src={rowData.anh_lo_hang}  className='product-image' />;
    }
    const columns = [
        {field: 'id', header: 'id'},
        {field: 'so_luong_nhap', header: 'so_luong_nhap'},
        {field: 'so_luong_da_ban', header: 'so_luong_da_ban'},
        {field: 'so_luong_doi_tra', header: 'so_luong_doi_tra'},
        {field: 'so_luong_hien_tai', header: 'so_luong_hien_tai'},
        {field: 'gia_nhap', header: 'gia_nhap'},
        {field: 'gia_ban', header: 'gia_ban'},
        {field: 'ma_san_pham', header: 'ma_san_pham'},
        {field: 'create_at', header: 'create_at'},
        {field: 'update_at', header: 'update_at'},
    ]
    // Khi nhấn 'Sửa', mở form và điền dữ liệu vào
    const func_update = (rowData) => {
        setFormData(rowData);
        setShowForm(true);
    };
    // Khi nhấn 'Xóa', hiển thị cảnh báo
    const func_delete = (rowData) => {
        if (window.confirm(`Bạn có chắc muốn xóa ${rowData.ten_lo_hang}?`)) {
            lohangService.deleteByID(rowData.id).then(() => {
                alert('Xóa thành công!');
            }).catch(err => console.error('Lỗi khi xóa:', err));
            setReload(!reload)
        }
    };
    // Khi nhấn 'Thêm mới', mở form trống
    const func_add = () => {
        setFormData({
        id: '',
        so_luong_nhap: '',
        so_luong_da_ban: '',
        so_luong_doi_tra: '',
        so_luong_hien_tai: '',
        gia_nhap: '',
        gia_ban: '',
        ma_san_pham: '',
        create_at: '',
        update_at: '',
        });
        setShowForm(true);
    };
    // Khi bấm 'Lưu' trong form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            lohangService.update([formData]).then(() => {
                alert('Cập nhật thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi cập nhật:', err));
        } else {
            lohangService.addNew([formData]).then(() => {
                alert('Thêm mới thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi thêm:', err));
        }
        setReload(!reload)
    };
    const func_search = (searchValue) => {
        setLoading(true)
        lohangService.getPaginationSearch(searchValue,pageSize,currentPage).then(d => {
            setList_Lohang(d)
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
        lohangService.getPagination(pageSize,currentPage).then(d => {
            setList_Lohang(d)
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
        const checkData = [...list_Lohang]
        while(checkData.length < pageSize) {
            checkData.push('')
        }
        setList_Lohang(checkData)
    }
    useEffect(() => {
        func_getPagination()
    },[currentPage, pageSize, reload])
    useEffect(()=> {
        fillData()
    }, [list_Lohang.length])
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
            <h1>{loading ? 'Đang tải dữ liệu... ':'Danh sách Lohang'}</h1>
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
            value={list_Lohang} 
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
        <Dialog header={formData.id ? 'Chỉnh sửa Lohang' : 'Thêm Lohang'} 
        visible={showForm} 
        style={{textAlign:'center'}} 
        onHide={() => setShowForm(false)}
        >
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label>id:</label>
                <input
                    type='text'
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    disabled
                />
                <label>so_luong_nhap:</label>
                <input
                    type='text'
                    value={formData.so_luong_nhap}
                    onChange={(e) => setFormData({ ...formData, so_luong_nhap: e.target.value })}
                    required
                />
                <label>so_luong_da_ban:</label>
                <input
                    type='text'
                    value={formData.so_luong_da_ban}
                    onChange={(e) => setFormData({ ...formData, so_luong_da_ban: e.target.value })}
                    required
                />
                <label>so_luong_doi_tra:</label>
                <input
                    type='text'
                    value={formData.so_luong_doi_tra}
                    onChange={(e) => setFormData({ ...formData, so_luong_doi_tra: e.target.value })}
                    required
                />
                <label>so_luong_hien_tai:</label>
                <input
                    type='text'
                    value={formData.so_luong_hien_tai}
                    onChange={(e) => setFormData({ ...formData, so_luong_hien_tai: e.target.value })}
                    required
                />
                <label>gia_nhap:</label>
                <input
                    type='text'
                    value={formData.gia_nhap}
                    onChange={(e) => setFormData({ ...formData, gia_nhap: e.target.value })}
                    required
                />
                <label>gia_ban:</label>
                <input
                    type='text'
                    value={formData.gia_ban}
                    onChange={(e) => setFormData({ ...formData, gia_ban: e.target.value })}
                    required
                />
                <label>ma_san_pham:</label>
                <input
                    type='text'
                    value={formData.ma_san_pham}
                    onChange={(e) => setFormData({ ...formData, ma_san_pham: e.target.value })}
                    required
                />
                <label>create_at:</label>
                <input
                    type='text'
                    value={formData.create_at}
                    onChange={(e) => setFormData({ ...formData, create_at: e.target.value })}
                    disabled
                />
                <label>update_at:</label>
                <input
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