
import db from '../common/db.js'
import { Anhsanpham } from '../models/anhsanpham.model.js'

class AnhsanphamService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToAnhsanpham(data) {
        return data.map(i => new Anhsanpham(
			i.id,
			i.url_anh_san_pham,
			i.ma_san_pham,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToAnhsanpham, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToAnhsanpham, callback)
    }
    insert(obj, callback) {
        const anhsanpham = this.converToAnhsanpham(obj)
        this.db.insert(this.tablename, anhsanpham[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const anhsanpham = this.converToAnhsanpham(obj)
        this.db.update(this.tablename, anhsanpham[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'url_anh_san_pham', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToAnhsanpham, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'url_anh_san_pham', 'ma_san_pham', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToAnhsanpham, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToAnhsanpham, callback)
    }
}

export default new AnhsanphamService(db, 'anh_san_pham')