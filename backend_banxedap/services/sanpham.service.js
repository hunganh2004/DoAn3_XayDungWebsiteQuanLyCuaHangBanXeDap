
import db from '../common/db.js'
import { Sanpham } from '../models/sanpham.model.js'

class SanphamService {
    constructor(db, tablename) {
        this.db = db
        this.tablename = tablename
    }
    converToSanpham(data) {
        return data.map(i => new Sanpham(
			i.id,
			i.ten_san_pham,
			i.trong_luong,
			i.chat_lieu_khung,
			i.kich_thuoc_banh,
			i.loai_phanh,
			i.he_thong_so,
			i.giam_soc,
			i.mau_sac,
			i.nam_phat_hanh,
			i.anh_san_pham,
            i.gia_ban,
			i.ma_loai_san_pham,
			i.ma_hang_san_xuat,
			i.ma_nha_cung_cap,
			i.create_at,
			i.update_at,
        ))
    }
    getAll(callback) {
        this.db.getAll(this.tablename, this.converToSanpham, callback)
    }
    getById(id,callback) {
        this.db.getById(this.tablename, id, this.converToSanpham, callback)
    }
    insert(obj, callback) {
        const sanpham = this.converToSanpham(obj)
        this.db.insert(this.tablename, sanpham[0].toOjectNoPRIandCURRENT_TIMESTAMP(), callback)
    }
    update(obj, callback) {
        const sanpham = this.converToSanpham(obj)
        this.db.update(this.tablename, sanpham[0].toOjectNoCURRENT_TIMESTAMP(), callback)
    }
    delete(id, callback) {
        this.db.delete(this.tablename,id,callback)
    }
    getSearch(searchValue ,callback) {
        const fields = ['id', 'ten_san_pham', 'trong_luong', 'chat_lieu_khung', 'kich_thuoc_banh', 'loai_phanh', 'he_thong_so', 'giam_soc', 'mau_sac', 'nam_phat_hanh', 'anh_san_pham', 'ma_loai_san_pham', 'ma_hang_san_xuat', 'ma_nha_cung_cap','gia_ban', 'create_at', 'update_at']
        this.db.getSearch(this.tablename, searchValue,fields, this.converToSanpham, callback)
    }
    getPaginationSearch(searchValue, pageSize, pageNumber, callback) {
        const fields = ['id', 'ten_san_pham', 'trong_luong', 'chat_lieu_khung', 'kich_thuoc_banh', 'loai_phanh', 'he_thong_so', 'giam_soc', 'mau_sac', 'nam_phat_hanh', 'anh_san_pham', 'ma_loai_san_pham', 'ma_hang_san_xuat', 'ma_nha_cung_cap','gia_ban', 'create_at', 'update_at']
        this.db.getPaginationSearch(this.tablename, searchValue, fields, pageSize, pageNumber, this.converToSanpham, callback)
    }
    getPagination(pageSize, pageNumber, callback) {
        this.db.getPagination(this.tablename, pageSize, pageNumber, this.converToSanpham, callback)
    }
    getPaginationByCategory(categoryId, pageSize, pageNumber, callback) {
        // this.db.getPaginationByCategory(this.tablename, categoryId, pageSize, pageNumber, this.converToSanpham, callback)
        const sql = `SELECT * FROM ${this.tablename} WHERE ma_loai_san_pham = ? ORDER BY id LIMIT ? OFFSET ?`
        const position = (parseInt(pageNumber) - 1) * parseInt(pageSize);
        if (isNaN(pageSize) || isNaN(pageNumber) || pageSize <= 0 || pageNumber <= 0) {
            return callback(new Error("pageSize và pageNumber phải là số nguyên dương"));
        }
        if (isNaN(categoryId) || categoryId <= 0) {
            return callback(new Error("categoryId phải là số nguyên dương"));
        }
        this.db.executeQuery(sql, [categoryId, parseInt(pageSize), position], this.converToSanpham, callback)
    }
}

export default new SanphamService(db, 'san_pham')