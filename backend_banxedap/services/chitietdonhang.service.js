
import db from '../common/db.js'
import { Chitietdonhang } from '../models/chitietdonhang.model.js'

class ChitietdonhangService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToChitietdonhang(data) {
        return data.map(i => new Chitietdonhang(
			i.id,
			i.so_luong,
			i.ma_don_hang,
			i.ma_san_pham,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToChitietdonhang, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToChitietdonhang, callback)
    }
    insert(obj, callback) {
        const chitietdonhang = this.converToChitietdonhang(obj)
        this.db.insert(this.tablename, chitietdonhang[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const chitietdonhang = this.converToChitietdonhang(obj)
        this.db.update(this.tablename, chitietdonhang[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'so_luong', 'ma_don_hang', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToChitietdonhang, callback)
    }
    getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'so_luong', 'ma_don_hang', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToChitietdonhang, callback)
    }
    getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToChitietdonhang, callback)
    }
}

export default new ChitietdonhangService(db, 'chi_tiet_don_hang')