
import bcrypt from "bcryptjs"

class Nguoidung {
	constructor(id, email_nguoi_dung, mat_khau_nguoi_dung, ma_loai_nguoi_dung, create_at, update_at) {
		this.id = id
		this.email_nguoi_dung = email_nguoi_dung
		this.mat_khau_nguoi_dung = mat_khau_nguoi_dung
		this.ma_loai_nguoi_dung = ma_loai_nguoi_dung
		this.create_at = create_at.toLocaleString('vi-VN')
		this.update_at = update_at.toLocaleString('vi-VN')
    }
    toOjectNoPRIandCURRENT_TIMESTAMP() {
        const {id,create_at, update_at, ...newObj} = this
        return newObj
    }
    toOjectNoCURRENT_TIMESTAMP() {
        const {create_at, update_at, ...newObj} = this
        return newObj
    }
    encryptionPassword() {
        //C1:
        // if (this.mat_khau_nguoi_dung.length !== 60) {
        //     this.mat_khau_nguoi_dung = bcrypt.hashSync(this.mat_khau_nguoi_dung)
        //     console.log('Đã mã hóa thành công !')
        //     return
        // }
        // console.log('Mật khẩu giữ nguyên !')

        //C2:
        // Regex kiểm tra hash của bcrypt (prefix $2a$, $2b$, hoặc $2y$)
        const bcryptHashRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

        if (!bcryptHashRegex.test(this.mat_khau_nguoi_dung)) {
            this.mat_khau_nguoi_dung = bcrypt.hashSync(this.mat_khau_nguoi_dung, 10);
            }
    }
    
}

export {Nguoidung}