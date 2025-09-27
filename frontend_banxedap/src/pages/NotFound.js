import { Link } from "react-router-dom";
import '../styles/notfound.css'

export default function NotFound() {
    return(
        <div className="notfound-container">
            <div className="notfound">
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-message">Oh no ! Trang này không tồn tại !</h2>
                <p className="notfound-description">Trang bạn tìm kiếm có thể đã đưuọc di chuyển hoặc xóa !</p>
                <Link to="/" className="notfound-home-link">Quay về trang chủ</Link>
            </div>
        </div>
    )
}