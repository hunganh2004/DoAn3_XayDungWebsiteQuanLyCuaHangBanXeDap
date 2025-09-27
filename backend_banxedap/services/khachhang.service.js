
import db from '../common/db.js'
import { Khachhang } from '../models/khachhang.model.js'

class KhachhangService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToKhachhang(data) {
        return data.map(i => new Khachhang(
			i.id,
			i.ten_khach_hang,
			i.sdt_khach_hang,
			i.dia_chi_khach_hang,
			i.ma_nguoi_dung,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToKhachhang, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToKhachhang, callback)
    }
    insert(obj, callback) {
        const khachhang = this.converToKhachhang(obj)
        this.db.insert(this.tablename, khachhang[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const khachhang = this.converToKhachhang(obj)
        this.db.update(this.tablename, khachhang[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_khach_hang', 'sdt_khach_hang', 'dia_chi_khach_hang', 'ma_nguoi_dung', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToKhachhang, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_khach_hang', 'sdt_khach_hang', 'dia_chi_khach_hang', 'ma_nguoi_dung', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToKhachhang, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToKhachhang, callback)
    }
    getByNguoiDungId(id,callback) {
        const sql = `SELECT * FROM ${this.tablename} WHERE ma_nguoi_dung = ?`
        this.db.executeQuery(sql, id,this.converToKhachhang , callback)
    }
}

export default new KhachhangService(db, 'khach_hang')