
import { useState, useEffect } from 'react';
import anhsanphamService from '../services/anhsanphamService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
export default function AnhsanphamPage() {
    const [list_Anhsanpham, setList_Anhsanpham] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [reload, setReload] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [nextPage, setNextPage] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const newItem = {
        id: '',
        url_anh_san_pham: '',
        ma_san_pham: '',
        create_at: '',
        update_at: '',
    }
    const [formData, setFormData] = useState(newItem)
    const imageTemplate = (rowData) => {
        if (!rowData || !rowData.anh_anh_san_pham) {
            return <img  className='product-image' />
        }
        return <img src={rowData.anh_anh_san_pham}  className='product-image' />;
    }
    const columns = [
        {field: 'id', header: 'id'},
        {field: 'url_anh_san_pham', header: 'url_anh_san_pham'},
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
        if (window.confirm(`Bạn có chắc muốn xóa ${rowData.ten_anh_san_pham}?`)) {
            anhsanphamService.deleteByID(rowData.id).then(() => {
                alert('Xóa thành công!');
            }).catch(err => console.error('Lỗi khi xóa:', err));
            setReload(!reload)
        }
    };
    // Khi nhấn 'Thêm mới', mở form trống
    const func_add = () => {
        setFormData({
        id: '',
        url_anh_san_pham: '',
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
            anhsanphamService.update([formData]).then(() => {
                alert('Cập nhật thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi cập nhật:', err));
        } else {
            anhsanphamService.addNew([formData]).then(() => {
                alert('Thêm mới thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi thêm:', err));
        }
        setReload(!reload)
    };
    const func_search = (searchValue) => {
        setLoading(true)
        anhsanphamService.getPaginationSearch(searchValue,pageSize,currentPage).then(d => {
            setList_Anhsanpham(d)
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
        anhsanphamService.getPagination(pageSize,currentPage).then(d => {
            setList_Anhsanpham(d)
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
        const checkData = [...list_Anhsanpham]
        while(checkData.length < pageSize) {
            checkData.push('')
        }
        setList_Anhsanpham(checkData)
    }
    useEffect(() => {
        func_getPagination()
    },[currentPage, pageSize, reload])
    useEffect(()=> {
        fillData()
    }, [list_Anhsanpham.length])
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
            <h1>{loading ? 'Đang tải dữ liệu... ':'Danh sách Anhsanpham'}</h1>
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
            value={list_Anhsanpham} 
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
        <Dialog header={formData.id ? 'Chỉnh sửa Anhsanpham' : 'Thêm Anhsanpham'} 
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
                <label>url_anh_san_pham:</label>
                <input
                    type='text'
                    value={formData.url_anh_san_pham}
                    onChange={(e) => setFormData({ ...formData, url_anh_san_pham: e.target.value })}
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