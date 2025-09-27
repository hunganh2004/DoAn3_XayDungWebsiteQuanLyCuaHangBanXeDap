import { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { addToCart, productInCart} from '../utils/cartUtils';
import '../styles/productpage.css'
import sanphamService from '../services/productService'
import { useNavigate } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(window.location.search);
}

export default function ProductPage({handleReload}) {
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();
    const query = useQuery();
    const searchValue = query.get('search') || '';
    const listProduct = productInCart();

    const checkProduct = (productId) => {
        return listProduct.includes(productId);
    }
    useEffect(() => {
        if (searchValue) {
            sanphamService.getPaginationSearch(searchValue, pageSize, currentPage)
                .then(res => {
                    setProduct(res);
                })
                .catch(err => console.log(err));
            return;
        }
        sanphamService.getPagination(pageSize, currentPage)
            .then(res => {
                setProduct(res);
            })
            .catch(err => console.log(err));
    }, [currentPage, searchValue]);

    const openDialog = (product) => {
        setSelectedProduct(product);
        setDisplayDialog(true);
    };

    const hideDialog = () => {
        setDisplayDialog(false);
        setSelectedProduct(null);
    };


    return (
        <div className='product-page'>
            <h2>{searchValue? 'Kết quả của: ' + searchValue :'Danh sách sản phẩm' }</h2>
            <div className='product-grid'>
                {product.map((item) => (
                    <Card key={item.id} className="product-card" title={item.ten_san_pham}>
                        <img src={item.anh_san_pham || 'images/default-product.png'} alt={item.ten_san_pham} className="product-image" />
                        <h3>{item.gia_ban.toLocaleString()} VNĐ</h3>
                        <Button 
                            label="Xem chi tiết" 
                            className="p-button-outlined view-button" 
                            onClick={() => openDialog(item)} />
                    </Card>
                ))}
            </div>

            {/* Dialog chi tiết sản phẩm */}
            <Dialog
                header={selectedProduct ? selectedProduct.ten_san_pham : ''}
                visible={displayDialog}
                onHide={hideDialog}
            >
                <div className='product-detail'>
                    <img
                        src={selectedProduct ? selectedProduct.anh_san_pham : 'images/default-product.png'}
                        alt={selectedProduct ? selectedProduct.ten_san_pham : ''}
                        className="product-detail-image"
                    />
                    <h3>{selectedProduct?.ten_san_pham}</h3>
                    <div className="product-info">
                        <p><strong>Giá bán:</strong> {selectedProduct?.gia_ban?.toLocaleString()} VNĐ</p>
                        <p><strong>Trọng lượng:</strong> {selectedProduct?.trong_luong}</p>
                        <p><strong>Chất liệu khung:</strong> {selectedProduct?.chat_lieu_khung}</p>
                        <p><strong>Kích thước bánh:</strong> {selectedProduct?.kich_thuoc_banh}</p>
                        <p><strong>Loại phanh:</strong> {selectedProduct?.loai_phanh}</p>
                        <p><strong>Hệ thống số:</strong> {selectedProduct?.he_thong_so}</p>
                        <p><strong>Giảm xóc:</strong> {selectedProduct?.giam_soc}</p>
                        <p><strong>Màu sắc:</strong> {selectedProduct?.mau_sac}</p>
                        <p><strong>Năm phát hành:</strong> {selectedProduct?.nam_phat_hanh}</p>
                    </div>
                    {/* {selectedProduct && productInCart(selectedProduct.id) && (
                        <p className='in-cart'>Sản phẩm đã có trong giỏ hàng</p>
                    )} */}
                    <Button 
                        label= {checkProduct(selectedProduct?.id) ? 'Xem giỏ hàng' : 'Thêm vào giỏ hàng'}
                        className={checkProduct(selectedProduct?.id) ? 'p-button-help mt-3' : 'p-button-success mt-3'} 
                        onClick={checkProduct(selectedProduct?.id) ? 
                            () => navigate('/cart') : 
                            () => {
                                addToCart(selectedProduct)
                                listProduct.push(selectedProduct.id)
                                handleReload()
                                hideDialog()
                                alert('Thêm sản phẩm vào giỏ hàng thành công!')
                            }}
                        />
                </div>
            </Dialog>

            {/* Nút chuyển trang */}
            <div className="pagination-buttons">
                <Button 
                    label="Previous" 
                    icon="pi pi-angle-left" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
                    disabled={currentPage === 1} 
                />
                <span className="current-page-label">Trang {currentPage}</span>
                <Button 
                    label="Next" 
                    icon="pi pi-angle-right" 
                    iconPos="right" 
                    onClick={() => setCurrentPage(prev => prev + 1)} 
                    disabled={product.length < pageSize} 
                />
            </div>
        </div>
    )
}
