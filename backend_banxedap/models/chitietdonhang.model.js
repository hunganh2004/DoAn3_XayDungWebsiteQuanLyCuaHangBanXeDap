
class Chitietdonhang {
	constructor(id, so_luong, ma_don_hang, ma_san_pham, create_at, update_at) {
		this.id = id
		this.so_luong = so_luong
		this.ma_don_hang = ma_don_hang
		this.ma_san_pham = ma_san_pham
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

export {Chitietdonhang}