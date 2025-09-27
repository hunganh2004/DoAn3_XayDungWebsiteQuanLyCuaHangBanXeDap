
class KhachhangService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/khachhang/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/khachhang/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/khachhang/all`)
                .then(res => res.json())
    }
    addNew(khachhang) {
        return fetch('http://localhost:3456/khachhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khachhang)
        })
                .then(res => res.json())
    }
    update(khachhang) {
        return fetch('http://localhost:3456/khachhang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khachhang)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/khachhang/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const khachhangService = new KhachhangService()
export default khachhangService