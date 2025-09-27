import { useState, useEffect } from "react";
import {Card} from "primereact/card";
import { Button } from "primereact/button";
import '../styles/categorysection.css';
import loaisanphamService from "../services/categoryService";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {

    const templateCategory = [
        {
            id: 1,
            ten_loai_san_pham: "Xe địa hình",
            anh_loai_san_pham: "images/default-product.png"
        },
        {
            id: 2,
            ten_loai_san_pham: "Xe trẻ em",
            anh_loai_san_pham: "images/default-product.png"
        },
        {
            id: 3,
            ten_loai_san_pham: "Xe đạp đua",
            anh_loai_san_pham: "images/default-product.png"
        }
    ]

    const [categories, setCategories] = useState(templateCategory);
    const navigate = useNavigate();

    

    useEffect(() => {
        loaisanphamService.getAll()
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.error(err));
    }, []);
    const handleCategoryClick = (category) => {
        navigate('/product?search=' + category.ten_loai_san_pham);
    }

    return (
        <div className="category-section">
            <h2>Danh mục sản phẩm</h2>
            <div className="category-grid">
                {categories.map((category) => (
                    <Card key={category.id} className="category-card" title={category.ten_loai_san_pham}>
                        <img src={category.anh_loai_san_pham} alt={category.ten_loai_san_pham} className="category-image" />
                        <Button 
                            label="Xem chi tiết" 
                            className="p-button-outlined"
                            onClick={() => handleCategoryClick(category)}
                            />
                    </Card>
                ))}
            </div>
        </div>
    )
}