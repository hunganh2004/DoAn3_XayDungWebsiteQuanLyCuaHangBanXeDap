
class SanphamService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/sanpham/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/sanpham/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/sanpham/all`)
                .then(res => res.json())
    }
    addNew(sanpham) {
        return fetch('http://localhost:3456/sanpham',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sanpham)
        })
                .then(res => res.json())
    }
    update(sanpham) {
        return fetch('http://localhost:3456/sanpham', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sanpham)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/sanpham/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const sanphamService = new SanphamService()
export default sanphamService