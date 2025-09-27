
class Hangsanxuat {
	constructor(id, ten_hang_san_xuat, quoc_gia, create_at, update_at) {
		this.id = id
		this.ten_hang_san_xuat = ten_hang_san_xuat
		this.quoc_gia = quoc_gia
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

export {Hangsanxuat}