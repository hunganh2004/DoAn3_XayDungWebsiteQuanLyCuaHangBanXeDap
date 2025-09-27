
import { useState, useEffect} from 'react';
import sanphamService from '../services/sanphamService'
import loaisanphamService from '../services/loaisanphamService';
import nhacungcapService from '../services/nhacungcapService';
import hangsanxuatService from '../services/hangsanxuatService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
export default function SanphamPage() {
    const [list_Sanpham, setList_Sanpham] = useState([])
    const [list_loaiSP, setList_loaiSP] = useState([])
    const [list_hangSX, setList_HangSX] = useState([])
    const [list_nhaCC, setList_nhaCC] = useState([])

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [reload, setReload] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [nextPage, setNextPage] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const newItem = {
        id: '',
        ten_san_pham: '',
        trong_luong: '',
        chat_lieu_khung: '',
        kich_thuoc_banh: '',
        loai_phanh: '',
        he_thong_so: '',
        giam_soc: '',
        mau_sac: '',
        nam_phat_hanh: '',
        anh_san_pham: '',
        gia_ban: '',
        ma_loai_san_pham: '',
        ma_hang_san_xuat: '',
        ma_nha_cung_cap: '',
        create_at: '',
        update_at: '',
    }
    
    const [formData, setFormData] = useState(newItem)
    const imageTemplate = (rowData) => {
        if (!rowData || !rowData.anh_san_pham) {
            return 
        }
        return <img src={rowData.anh_san_pham}  className='product-image' alt={rowData.ten_san_pham}/>;
    }
    const priceTemplate = (rowData) => {
        if (!rowData || !rowData.gia_ban) {
            return <div></div>
        }
        return <div>{rowData.gia_ban.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>;
    }
    const columns = [
        {field: 'id', header: 'id'},
        {field: '', header: 'Ảnh sản phẩm', body: imageTemplate},
        {field: 'gia_ban', header: 'Giá bán', body: priceTemplate},
        {field: 'ten_san_pham', header: 'Tên sản phẩm'},
        {field: 'trong_luong', header: 'Trọng lượng'},
        {field: 'chat_lieu_khung', header: 'Chất liệu khung'},
        {field: 'kich_thuoc_banh', header: 'Kích thước bánh'},
        {field: 'loai_phanh', header: 'Loại phanh'},
        {field: 'he_thong_so', header: 'Hệ thống số'},
        {field: 'giam_soc', header: 'Giảm sóc'},
        {field: 'mau_sac', header: 'Màu sắc'},
        {field: 'nam_phat_hanh', header: 'Năm phát hành'},
        {field: 'ten_loai_san_pham', header: 'Tên loại sản phẩm'},
        {field: 'ten_hang_san_xuat', header: 'Tên hãng SX'},
        {field: 'ten_nha_cung_cap', header: 'Tên MCC'},
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
        if (window.confirm(`Bạn có chắc muốn xóa ${rowData.ten_san_pham}?`)) {
            sanphamService.deleteByID(rowData.id).then(() => {
                alert('Xóa thành công!');
            }).catch(err => console.error('Lỗi khi xóa:', err));
            setReload(!reload)
        }
    };
    // Khi nhấn 'Thêm mới', mở form trống
    const func_add = () => {
        setFormData({
        id: '',
        ten_san_pham: '',
        trong_luong: '',
        chat_lieu_khung: '',
        kich_thuoc_banh: '',
        loai_phanh: '',
        he_thong_so: '',
        giam_soc: '',
        mau_sac: '',
        nam_phat_hanh: '',
        anh_san_pham: '',
        gia_ban:'',
        ma_loai_san_pham: '',
        ma_hang_san_xuat: '',
        ma_nha_cung_cap: '',
        create_at: '',
        update_at: '',
        });
        setShowForm(true);
    };
    // Khi bấm 'Lưu' trong form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            sanphamService.update([formData]).then(() => {
                alert('Cập nhật thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi cập nhật:', err));
        } else {
            sanphamService.addNew([formData]).then(() => {
                alert('Thêm mới thành công!');
                setShowForm(false);
            }).catch(err => console.error('Lỗi khi thêm:', err));
        }
        setReload(!reload)
    };
    const func_search = (searchValue) => {
        setLoading(true)
        sanphamService.getPaginationSearch(searchValue,pageSize,currentPage).then(d => {
            setList_Sanpham(HandleData(d))
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
        sanphamService.getPagination(pageSize,currentPage).then(d => {
            setList_Sanpham(HandleData(d))
            if (d.length < pageSize) {
                setNextPage(false)
            }
            else{
                setNextPage(true)
            }
        })
        .catch(err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        }).finally(()=>{setLoading(false)})
    }
    const HandleData = (list_Sanpham) => {
        const data =  list_Sanpham.map(sp => {
            const loaiSP = list_loaiSP.find(lsp => lsp.id === sp.ma_loai_san_pham)
            const hangSX = list_hangSX.find(hsx => hsx.id === sp.ma_hang_san_xuat)
            const nhaCC = list_nhaCC.find(ncc => ncc.id === sp.ma_nha_cung_cap)
            
            return {
                ...sp,
                ten_loai_san_pham: loaiSP ? loaiSP.ten_loai_san_pham : '',
                ten_hang_san_xuat: hangSX ? hangSX.ten_hang_san_xuat : '',
                ten_nha_cung_cap: nhaCC ? nhaCC.ten_nha_cung_cap : ''
            }
        })
        // console.log(data)
        return data
    }
    function fillData() {
        const checkData = [...list_Sanpham]
        while(checkData.length < pageSize) {
            checkData.push('')
        }
        setList_Sanpham(checkData)
    }
    useEffect(() => {
        if (list_loaiSP.length && list_hangSX.length && list_nhaCC.length) {
            func_getPagination();
            console.log(list_Sanpham)
        }
    }, [list_loaiSP, list_hangSX, list_nhaCC, currentPage, pageSize, reload]);
    useEffect(()=> {
        fillData()
    }, [list_Sanpham.length])
    useEffect(() => {
        loaisanphamService.getAll().then(d => {
            setList_loaiSP(d)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
        hangsanxuatService.getAll().then(d => {
            setList_HangSX(d)
        }).catch( err => {
            console.error('Lỗi khi lấy dữ liệu: ', err)
        })
        nhacungcapService.getAll().then(d => {
            setList_nhaCC(d)
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
            <h1>{loading ? 'Đang tải dữ liệu... ':'Danh sách sản phẩm'}</h1>
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
            value={list_Sanpham} 
            className='custom-table'
            // scrollable
            // scrollHeight='flex'
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
                style={col.style}
                headerStyle={col.headerStyle}
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
        <Dialog header={formData.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'} 
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
                <label>Tên sản phẩm:</label>
                <InputText
                    type='text'
                    value={formData.ten_san_pham}
                    onChange={(e) => setFormData({ ...formData, ten_san_pham: e.target.value })}
                    required
                />
                <label>Trọng lượng:</label>
                <InputText
                    type='text'
                    value={formData.trong_luong}
                    onChange={(e) => setFormData({ ...formData, trong_luong: e.target.value })}
                    required
                />
                <label>Chất liệu khung:</label>
                <InputText
                    type='text'
                    value={formData.chat_lieu_khung}
                    onChange={(e) => setFormData({ ...formData, chat_lieu_khung: e.target.value })}
                    required
                />
                <label>Kích thước bánh:</label>
                <InputText
                    type='text'
                    value={formData.kich_thuoc_banh}
                    onChange={(e) => setFormData({ ...formData, kich_thuoc_banh: e.target.value })}
                    required
                />
                <label>Loại phanh:</label>
                <InputText
                    type='text'
                    value={formData.loai_phanh}
                    onChange={(e) => setFormData({ ...formData, loai_phanh: e.target.value })}
                    required
                />
                <label>Hệ thống số:</label>
                <InputText
                    type='text'
                    value={formData.he_thong_so}
                    onChange={(e) => setFormData({ ...formData, he_thong_so: e.target.value })}
                    required
                />
                <label>Giảm sóc:</label>
                <InputText
                    type='text'
                    value={formData.giam_soc}
                    onChange={(e) => setFormData({ ...formData, giam_soc: e.target.value })}
                    required
                />
                <label>Màu sắc:</label>
                <InputText
                    type='text'
                    value={formData.mau_sac}
                    onChange={(e) => setFormData({ ...formData, mau_sac: e.target.value })}
                    required
                />
                <label>Năm phát hành:</label>
                <InputText
                    type='text'
                    value={formData.nam_phat_hanh}
                    onChange={(e) => setFormData({ ...formData, nam_phat_hanh: e.target.value })}
                    required
                />
                <label>Giá bán:</label>
                <InputText
                    type='text'
                    value={formData.gia_ban}
                    onChange={(e) => setFormData({ ...formData, gia_ban: e.target.value })}
                    required
                />
                <label>Đường dẫn ảnh:</label>
                <InputText
                    type='text'
                    value={formData.anh_san_pham}
                    onChange={(e) => setFormData({ ...formData, anh_san_pham: e.target.value })}
                    required
                />
                <label>Loại sản phẩm:</label>
                <Dropdown 
                value={list_loaiSP.find(hsx => hsx.id === formData.ma_loai_san_pham)}
                options={list_loaiSP}
                onChange={(e) => { 
                    setFormData({...formData, 
                        ma_loai_san_pham: e.value.id, 
                        ten_loai_san_pham: e.value.ten_loai_san_pham
                    })
                    
                }}
                optionLabel='ten_loai_san_pham'
                placeholder='chọn loại sản phẩm'
                style={{width: '50%', textAlign:'left'}}
                />
                <label>Hãng sản xuất:</label>
                <Dropdown 
                value={list_hangSX.find(hsx => hsx.id === formData.ma_hang_san_xuat)}
                options={list_hangSX}
                onChange={(e) => { 
                    setFormData({...formData, 
                        ma_hang_san_xuat: e.value.id, 
                        ten_hang_san_xuat: e.value.ten_hang_san_xuat
                    })
                }}
                optionLabel='ten_hang_san_xuat'
                placeholder='chọn hãng sản xuất'
                style={{width: '50%', textAlign: 'left'}}
                />
                <label>Nhà cung cấp:</label>
                <Dropdown 
                value={list_nhaCC.find(hsx => hsx.id === formData.ma_nha_cung_cap)}
                options={list_nhaCC}
                onChange={(e) => { 
                    setFormData({...formData, 
                        ma_nha_cung_cap: e.value.id, 
                        ten_nha_cung_cap: e.value.ten_nha_cung_cap
                    })
                }}
                optionLabel='ten_nha_cung_cap'
                placeholder='chọn nhà cung cấp'
                style={{width: '50%', textAlign: 'left'}}
                />
                
                <label>Ngày tạo:</label>
                <InputText
                    type='text'
                    value={formData.create_at}
                    onChange={(e) => setFormData({ ...formData, create_at: e.target.value })}
                    disabled
                />
                <label>Ngày cập nhật:</label>
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