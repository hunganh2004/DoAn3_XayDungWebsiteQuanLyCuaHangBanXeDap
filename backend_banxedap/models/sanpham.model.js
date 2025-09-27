
class Sanpham {
	constructor(id, ten_san_pham, trong_luong, chat_lieu_khung, kich_thuoc_banh, loai_phanh, he_thong_so, giam_soc, mau_sac, nam_phat_hanh, anh_san_pham, gia_ban, ma_loai_san_pham, ma_hang_san_xuat, ma_nha_cung_cap, create_at, update_at) {
		this.id = id
		this.ten_san_pham = ten_san_pham
		this.trong_luong = trong_luong
		this.chat_lieu_khung = chat_lieu_khung
		this.kich_thuoc_banh = kich_thuoc_banh
		this.loai_phanh = loai_phanh
		this.he_thong_so = he_thong_so
		this.giam_soc = giam_soc
		this.mau_sac = mau_sac
		this.nam_phat_hanh = nam_phat_hanh
		this.anh_san_pham = anh_san_pham
		this.gia_ban = gia_ban
		this.ma_loai_san_pham = ma_loai_san_pham
		this.ma_hang_san_xuat = ma_hang_san_xuat
		this.ma_nha_cung_cap = ma_nha_cung_cap
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

export {Sanpham}