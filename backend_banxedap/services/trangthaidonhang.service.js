
import db from '../common/db.js'
import { Trangthaidonhang } from '../models/trangthaidonhang.model.js'

class TrangthaidonhangService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToTrangthaidonhang(data) {
        return data.map(i => new Trangthaidonhang(
			i.id,
			i.ten_trang_thai,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToTrangthaidonhang, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToTrangthaidonhang, callback)
    }
    insert(obj, callback) {
        const trangthaidonhang = this.converToTrangthaidonhang(obj)
        this.db.insert(this.tablename, trangthaidonhang[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const trangthaidonhang = this.converToTrangthaidonhang(obj)
        this.db.update(this.tablename, trangthaidonhang[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_trang_thai', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToTrangthaidonhang, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_trang_thai', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToTrangthaidonhang, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToTrangthaidonhang, callback)
    }
}

export default new TrangthaidonhangService(db, 'trang_thai_don_hang')