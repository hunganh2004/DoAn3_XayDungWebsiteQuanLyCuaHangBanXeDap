
class Khuyenmai {
	constructor(id, tieu_de_khuyen_mai, noi_dung_khuyen_mai, anh_khuyen_mai, thoi_gian_bat_dau, thoi_gian_ket_thuc, gia_trị_khuyen_mai, tinh_trang_khuyen_mai, create_at, update_at) {
		this.id = id
		this.tieu_de_khuyen_mai = tieu_de_khuyen_mai
		this.noi_dung_khuyen_mai = noi_dung_khuyen_mai
		this.anh_khuyen_mai = anh_khuyen_mai
		this.thoi_gian_bat_dau = thoi_gian_bat_dau
		this.thoi_gian_ket_thuc = thoi_gian_ket_thuc
		this.gia_trị_khuyen_mai = gia_trị_khuyen_mai
		this.tinh_trang_khuyen_mai = tinh_trang_khuyen_mai
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

export {Khuyenmai}