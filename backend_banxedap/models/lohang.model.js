
class Lohang {
	constructor(id, so_luong_nhap, so_luong_da_ban, so_luong_doi_tra, so_luong_hien_tai, gia_nhap, gia_ban, ma_san_pham, create_at, update_at) {
		this.id = id
		this.so_luong_nhap = so_luong_nhap
		this.so_luong_da_ban = so_luong_da_ban
		this.so_luong_doi_tra = so_luong_doi_tra
		this.so_luong_hien_tai = so_luong_hien_tai
		this.gia_nhap = gia_nhap
		this.gia_ban = gia_ban
		this.ma_san_pham = ma_san_pham
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

export {Lohang}