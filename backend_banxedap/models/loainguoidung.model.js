
class Loainguoidung {
	constructor(id, ten_loai_nguoi_dung, create_at, update_at) {
		this.id = id
		this.ten_loai_nguoi_dung = ten_loai_nguoi_dung
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

export {Loainguoidung}