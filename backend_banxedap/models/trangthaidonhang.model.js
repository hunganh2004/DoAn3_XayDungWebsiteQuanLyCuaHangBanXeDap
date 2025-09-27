
class Trangthaidonhang {
	constructor(id, ten_trang_thai, create_at, update_at) {
		this.id = id
		this.ten_trang_thai = ten_trang_thai
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

export {Trangthaidonhang}