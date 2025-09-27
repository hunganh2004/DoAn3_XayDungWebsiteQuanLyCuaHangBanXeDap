
import db from '../common/db.js'
import { Nhanvien } from '../models/nhanvien.model.js'

class NhanvienService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToNhanvien(data) {
        return data.map(i => new Nhanvien(
			i.id,
			i.ten_nhan_vien,
			i.cmnd_nhan_vien,
			i.sdt_nhan_vien,
			i.dia_chi_nhan_vien,
			i.ma_nguoi_dung,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToNhanvien, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToNhanvien, callback)
    }
    insert(obj, callback) {
        const nhanvien = this.converToNhanvien(obj)
        this.db.insert(this.tablename, nhanvien[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const nhanvien = this.converToNhanvien(obj)
        this.db.update(this.tablename, nhanvien[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_nhan_vien', 'cmnd_nhan_vien', 'sdt_nhan_vien', 'dia_chi_nhan_vien', 'ma_nguoi_dung', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToNhanvien, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_nhan_vien', 'cmnd_nhan_vien', 'sdt_nhan_vien', 'dia_chi_nhan_vien', 'ma_nguoi_dung', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToNhanvien, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToNhanvien, callback)
    }
}

export default new NhanvienService(db, 'nhan_vien')