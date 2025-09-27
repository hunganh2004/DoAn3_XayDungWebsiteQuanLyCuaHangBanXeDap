
import db from '../common/db.js'
import { Hangsanxuat } from '../models/hangsanxuat.model.js'

class HangsanxuatService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToHangsanxuat(data) {
        return data.map(i => new Hangsanxuat(
			i.id,
			i.ten_hang_san_xuat,
			i.quoc_gia,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToHangsanxuat, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToHangsanxuat, callback)
    }
    insert(obj, callback) {
        const hangsanxuat = this.converToHangsanxuat(obj)
        this.db.insert(this.tablename, hangsanxuat[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const hangsanxuat = this.converToHangsanxuat(obj)
        this.db.update(this.tablename, hangsanxuat[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_hang_san_xuat', 'quoc_gia', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToHangsanxuat, callback)
    }
     getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_hang_san_xuat', 'quoc_gia', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToHangsanxuat, callback)
    }
     getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToHangsanxuat, callback)
    }
}

export default new HangsanxuatService(db, 'hang_san_xuat')