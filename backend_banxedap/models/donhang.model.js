
class Donhang {
	constructor(id, ten_nguoi_nhan, email_nguoi_nhan, sdt_nguoi_nhan, dia_chi_nguoi_nhan, ghi_chu, tong_tien, ma_khach_hang, ma_trang_thai, create_at, update_at) {
		this.id = id
		this.ten_nguoi_nhan = ten_nguoi_nhan
		this.email_nguoi_nhan = email_nguoi_nhan
		this.sdt_nguoi_nhan = sdt_nguoi_nhan
		this.dia_chi_nguoi_nhan = dia_chi_nguoi_nhan
		this.ghi_chu = ghi_chu
		this.tong_tien = tong_tien
		this.ma_khach_hang = ma_khach_hang
		this.ma_trang_thai = ma_trang_thai
		this.create_at = create_at ? new Date(create_at).toLocaleString('vi-VN') : null;
        this.update_at = update_at ? new Date(update_at).toLocaleString('vi-VN') : null;
    }
    toOjectNoPRIandCURRENT_TIMESTAMP() {
        const {id,create_at, update_at, ...newObj} = this
        return newObj
    }
    toOjectNoCURRENT_TIMESTAMP() {
        const {create_at, update_at, ...newObj} = this
        return newObj
    }
}

export {Donhang}