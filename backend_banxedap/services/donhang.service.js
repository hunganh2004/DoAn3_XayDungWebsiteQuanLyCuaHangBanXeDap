
import db from '../common/db.js'
import { Donhang } from '../models/donhang.model.js'

class DonhangService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToDonhang(data) {
        return data.map(i => new Donhang(
			i.id,
			i.ten_nguoi_nhan,
			i.email_nguoi_nhan,
			i.sdt_nguoi_nhan,
			i.dia_chi_nguoi_nhan,
			i.ghi_chu,
			i.tong_tien,
			i.ma_khach_hang,
			i.ma_trang_thai,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToDonhang, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToDonhang, callback)
    }
    insert(obj, callback) {
        const donhang = this.converToDonhang(obj)
        this.db.insert(this.tablename, donhang[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const donhang = this.converToDonhang(obj)
        this.db.update(this.tablename, donhang[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_nguoi_nhan', 'email_nguoi_nhan', 'sdt_nguoi_nhan', 'dia_chi_nguoi_nhan', 'ghi_chu', 'tong_tien', 'ma_khach_hang', 'ma_trang_thai','create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToDonhang, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_nguoi_nhan', 'email_nguoi_nhan', 'sdt_nguoi_nhan', 'dia_chi_nguoi_nhan', 'ghi_chu', 'tong_tien', 'ma_khach_hang', 'ma_trang_thai','create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToDonhang, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToDonhang, callback)
    }
}

export default new DonhangService(db, 'don_hang')