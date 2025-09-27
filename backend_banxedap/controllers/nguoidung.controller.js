
import service from '../services/nguoidung.service.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

class NguoidungController {
    constructor(service) {
        this.service = service
        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.getUserByPassword = this.getUserByPassword.bind(this)
        this.getPagination = this.getPagination.bind(this)
        this.getSearch = this.getSearch.bind(this)
        this.getPaginationSearch = this.getPaginationSearch.bind(this)
    }
    async getUserByPassword(req, res) {
        if (!req.body[0]) {
            return res.status(400).json({message: 'Du lieu không hợp lệ !'})
        }
        const {account, password} = req.body[0];

        if (!account || !password) {
            return res.status(400).json({message: 'Thông thông không hợp lệ !'})
        }

        this.service.getUserByPassWord(account, async (result) => {

            if (result.length === 0) {
                return res.status(400).json('Tài khoản không tồn tại !')
            }
            console.log(result)
            const dbpassword = result[0].mat_khau_nguoi_dung;

            if (!dbpassword) {
                return res.status(400).json('Mật khẩu không hợp lệ !')
            }

            if (dbpassword) {
                const isMatch = await bcrypt.compare(password, dbpassword);
                if (isMatch) {
                    const token = jwt.sign({account},config.get('JWT_SECRET'), {expiresIn: '24h'})
                    // res.send("Đăng nhập thành công !");
                    res.send({...result[0], token})
                    return
                }
                res.status(400).json('Mật khẩu sai !');
            }
        });
    }
    getSearch(req, res) {
            const searchValue = req.query.searchValue
    
            service.getSearch(searchValue, (result) => {
                res.send(result)
            })
        }
        getPaginationSearch(req, res) {
            const searchValue = req.query.searchValue
            const pageSize = parseInt(req.query.pageSize) || 10
            const pageNumber = parseInt(req.query.pageNumber) || 1
    
            service.getPaginationSearch(searchValue, pageSize, pageNumber, (result) => {
                res.send(result)
            })
        }
        getPagination(req, res) {
            const pageSize = parseInt(req.query.pageSize) || 10
            const pageNumber = parseInt(req.query.pageNumber) || 1
    
            console.log("pageSize:", pageSize, "pageNumber:", pageNumber); // Debug giá trị
    
            service.getPagination(pageSize, pageNumber, (result) => {
                res.send(result)
            })
        }
    getAll(req, res){
        this.service.getAll((result)=>{
            if (!result) {
                res.status(400).json({massage:'Dữ liệu trống !'})
            }
            res.send(result)
        })
    } 
    getById(req, res) {
        const id = req.params.id
        service.getById(id, (result)=> {
            res.send(result)
        })
    }
    insert(req, res) {
        const nguoidung = req.body
        service.insert(nguoidung, (result) => {
            if (!result.id) {
                return res.status(400).json({message: 'Lỗi khi thêm tài khoản'})
            }
            res.send(result)
        })
    }
    update(req, res) {
        const nguoidung = req.body
        // const id = req.params.id
        service.update(nguoidung, (result) => {
            res.send(result)
        })
    }
    delete(req, res) {
        const id = req.params.id
        service.delete(id, (result) => {
            res.send(result)
        })
    }
}

export default new NguoidungController(service)