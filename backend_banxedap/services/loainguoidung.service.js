
import db from '../common/db.js'
import { Loainguoidung } from '../models/loainguoidung.model.js'

class LoainguoidungService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToLoainguoidung(data) {
        return data.map(i => new Loainguoidung(
			i.id,
			i.ten_loai_nguoi_dung,
			i.create_at,
			i.update_at,
        ))
    } 
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToLoainguoidung, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToLoainguoidung, callback)
    }
    insert(obj, callback) {
        const loainguoidung = this.converToLoainguoidung(obj)
        this.db.insert(this.tablename, loainguoidung[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const loainguoidung = this.converToLoainguoidung(obj)
        this.db.update(this.tablename, loainguoidung[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_loai_nguoi_dung', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToLoainguoidung, callback)
    }
    getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_loai_nguoi_dung', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToLoainguoidung, callback)
    }
    getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToLoainguoidung, callback)
    }
}

export default new LoainguoidungService(db, 'loai_nguoi_dung')