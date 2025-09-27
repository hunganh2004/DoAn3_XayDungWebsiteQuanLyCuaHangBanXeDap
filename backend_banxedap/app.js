
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import config from 'config'
import multer from 'multer'
import fs from 'fs'

import anhsanphamRouter from './routes/anhsanpham.route.js'
import chitietdonhangRouter from './routes/chitietdonhang.route.js'
import donhangRouter from './routes/donhang.route.js'
import hangsanxuatRouter from './routes/hangsanxuat.route.js'
import khachhangRouter from './routes/khachhang.route.js'
import khuyenmaiRouter from './routes/khuyenmai.route.js'
import lohangRouter from './routes/lohang.route.js'
import loainguoidungRouter from './routes/loainguoidung.route.js'
import loaisanphamRouter from './routes/loaisanpham.route.js'
import nguoidungRouter from './routes/nguoidung.route.js'
import nhacungcapRouter from './routes/nhacungcap.route.js'
import nhanvienRouter from './routes/nhanvien.route.js'
import sanphamRouter from './routes/sanpham.route.js'
import trangthaidonhangRouter from './routes/trangthaidonhang.route.js'

var app = express()
app.use(cors())
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const directoryNames = [
    'loaisanpham',
    'sanpham',
    'nguoidung'
]

app.use(express.static(path.join(__dirname, 'public')))

if (!fs.existsSync(path.join(__dirname, 'public/uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'public/uploads'), { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log('Directory created successfully');
        }
    });
}

directoryNames.forEach(directoryName => {
    const directoryPath = path.join(__dirname, 'public/images/' + directoryName, );
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(path, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating directory:', err);
            } else {
                console.log('Directory created successfully');
            }
        });
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `D:/12522W1KS/Cong_nghe_web_va_ung_dung/Project/backend_banxedap/public/uploads`)
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({ 
    storage: storage, 
    // limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file là 5MB
    // fileFilter: function (req, file, cb) {
    //     const filetypes = /jpeg|jpg|png|gif/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     }
    //     cb('Error: File upload only supports the following filetypes - ' + filetypes);
    // }
})

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Không có file nào được tải lên.')
    }
    const fileUrl = `http://localhost:${config.get('PORT')}/uploads/${req.file.filename}`
    res.status(200).send(fileUrl)
})

app.post('/uploads', upload.array('images',5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Không có file nào được tải lên.')
    }
    const fileUrls = req.files.map(file => `http://localhost:${config.get('PORT')}/uploads/${file.filename}`)
    res.status(200).send(fileUrls)
})

app.use('/anhsanpham',anhsanphamRouter)
app.use('/chitietdonhang',chitietdonhangRouter)
app.use('/donhang',donhangRouter)
app.use('/hangsanxuat',hangsanxuatRouter)
app.use('/khachhang',khachhangRouter)
app.use('/khuyenmai',khuyenmaiRouter)
app.use('/lohang',lohangRouter)
app.use('/loainguoidung',loainguoidungRouter)
app.use('/loaisanpham',loaisanphamRouter)
app.use('/nguoidung',nguoidungRouter)
app.use('/nhacungcap',nhacungcapRouter)
app.use('/nhanvien',nhanvienRouter)
app.use('/sanpham',sanphamRouter)
app.use('/trangthaidonhang',trangthaidonhangRouter)

const PORT = config.get('PORT')
app.listen(PORT, ()=> {
    console.log(`http://localhost:` + PORT)
})
