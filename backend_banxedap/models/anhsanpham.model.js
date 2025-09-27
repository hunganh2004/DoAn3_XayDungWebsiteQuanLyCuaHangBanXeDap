
class Anhsanpham {
	constructor(id, url_anh_san_pham, ma_san_pham, create_at, update_at) {
		this.id = id
		this.url_anh_san_pham = url_anh_san_pham
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

export {Anhsanpham}