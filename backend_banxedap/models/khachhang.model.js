
class Khachhang {
	constructor(id, ten_khach_hang, sdt_khach_hang, dia_chi_khach_hang, ma_nguoi_dung, create_at, update_at) {
		this.id = id
		this.ten_khach_hang = ten_khach_hang
		this.sdt_khach_hang = sdt_khach_hang
		this.dia_chi_khach_hang = dia_chi_khach_hang
		this.ma_nguoi_dung = ma_nguoi_dung
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
}

export {Khachhang}