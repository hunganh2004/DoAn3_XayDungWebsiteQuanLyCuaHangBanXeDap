
import db from '../common/db.js'
import { Nguoidung } from '../models/nguoidung.model.js'


class NguoidungService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToNguoidung(data) {
        return data.map(i => new Nguoidung(
			i.id,
			i.email_nguoi_dung,
			i.mat_khau_nguoi_dung,
			i.ma_loai_nguoi_dung,
			i.create_at,
			i.update_at,
        ))
    }
    getUserByPassWord(account, callback) {
        const sql = `SELECT * FROM ${this.tablename} WHERE email_nguoi_dung = ?`
        const first = 'select * from '
        const second = ' where email_nguoi_dung = ? '
        const parameter = account

        this.db.executeQuery(sql, parameter, this.converToNguoidung, callback)
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToNguoidung, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToNguoidung, callback)
    }
    insert(obj, callback) {
        const nguoidung = this.converToNguoidung(obj)
        nguoidung[0].encryptionPassword()
        this.db.insert(this.tablename, nguoidung[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const nguoidung = this.converToNguoidung(obj)
        nguoidung[0].encryptionPassword()
        this.db.update(this.tablename, nguoidung[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'email_nguoi_dung', 'mat_khau_nguoi_dung', 'ma_loai_nguoi_dung', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToNguoidung, callback)
    }
    getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'email_nguoi_dung', 'mat_khau_nguoi_dung', 'ma_loai_nguoi_dung', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToNguoidung, callback)
    }
    getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToNguoidung, callback)
    }
}

export default new NguoidungService(db, 'nguoi_dung')