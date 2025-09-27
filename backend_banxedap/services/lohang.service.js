
import db from '../common/db.js'
import { Lohang } from '../models/lohang.model.js'

class LohangService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToLohang(data) {
        return data.map(i => new Lohang(
			i.id,
			i.so_luong_nhap,
			i.so_luong_da_ban,
			i.so_luong_doi_tra,
			i.so_luong_hien_tai,
			i.gia_nhap,
			i.gia_ban,
			i.ma_san_pham,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToLohang, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToLohang, callback)
    }
    insert(obj, callback) {
        const lohang = this.converToLohang(obj)
        this.db.insert(this.tablename, lohang[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const lohang = this.converToLohang(obj)
        this.db.update(this.tablename, lohang[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'so_luong_nhap', 'so_luong_da_ban', 'so_luong_doi_tra', 'so_luong_hien_tai', 'gia_nhap', 'gia_ban', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToLohang, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'so_luong_nhap', 'so_luong_da_ban', 'so_luong_doi_tra', 'so_luong_hien_tai', 'gia_nhap', 'gia_ban', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToLohang, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToLohang, callback)
    }
}

export default new LohangService(db, 'lo_hang')