import { Button } from 'primereact/button';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h4>Liên hệ</h4>
                    <p>Email: hunganh2004hy@gmail.com</p>
                    <br/>
                    <p>Số điện thoại: 0865713676</p>
                </div>

                <div className="footer-column">
                    <h4>Liên kết nhanh</h4>
                    <ul>
                        <li><Button label="Trang chủ" className="p-button-text" /></li>
                        <li><Button label="Giới thiệu" className="p-button-text" /></li>
                        <li><Button label="Chính sách bảo mật" className="p-button-text" /></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Mạng xã hội</h4>
                    <div className="social-links">
                        <SocialIcon url="https://facebook.com/yourstore" />
                        <SocialIcon url="https://twitter.com/yourstore" />
                        <SocialIcon url="https://instagram.com/yourstore" />
                    </div>
                </div>
            </div>

            {/* <div className="footer-bottom">
                <p>&copy; 2025 Your Store. Tất cả quyền lợi được bảo lưu.</p>
            </div> */}
        </div>
    );
};

export default Footer;
