
class Nhanvien {
	constructor(id, ten_nhan_vien, cmnd_nhan_vien, sdt_nhan_vien, dia_chi_nhan_vien, ma_nguoi_dung, create_at, update_at) {
		this.id = id
		this.ten_nhan_vien = ten_nhan_vien
		this.cmnd_nhan_vien = cmnd_nhan_vien
		this.sdt_nhan_vien = sdt_nhan_vien
		this.dia_chi_nhan_vien = dia_chi_nhan_vien
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

export {Nhanvien}