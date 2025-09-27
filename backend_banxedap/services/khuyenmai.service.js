
import db from '../common/db.js'
import { Khuyenmai } from '../models/khuyenmai.model.js'

class KhuyenmaiService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToKhuyenmai(data) {
        return data.map(i => new Khuyenmai(
			i.id,
			i.tieu_de_khuyen_mai,
			i.noi_dung_khuyen_mai,
			i.anh_khuyen_mai,
			i.thoi_gian_bat_dau,
			i.thoi_gian_ket_thuc,
			i.gia_trị_khuyen_mai,
			i.tinh_trang_khuyen_mai,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToKhuyenmai, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToKhuyenmai, callback)
    }
    insert(obj, callback) {
        const khuyenmai = this.converToKhuyenmai(obj)
        this.db.insert(this.tablename, khuyenmai[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const khuyenmai = this.converToKhuyenmai(obj)
        this.db.update(this.tablename, khuyenmai[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'tieu_de_khuyen_mai', 'noi_dung_khuyen_mai', 'anh_khuyen_mai', 'thoi_gian_bat_dau', 'thoi_gian_ket_thuc', 'gia_trị_khuyen_mai', 'tinh_trang_khuyen_mai', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToKhuyenmai, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'tieu_de_khuyen_mai', 'noi_dung_khuyen_mai', 'anh_khuyen_mai', 'thoi_gian_bat_dau', 'thoi_gian_ket_thuc', 'gia_trị_khuyen_mai', 'tinh_trang_khuyen_mai', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToKhuyenmai, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToKhuyenmai, callback)
    }
}

export default new KhuyenmaiService(db, 'khuyen_mai')