
class LoaisanphamService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/loaisanpham/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/loaisanpham/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/loaisanpham/all`)
                .then(res => res.json())
    }
    addNew(loaisanpham) {
        return fetch('http://localhost:3456/loaisanpham',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loaisanpham)
        })
                .then(res => res.json())
    }
    update(loaisanpham) {
        return fetch('http://localhost:3456/loaisanpham', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loaisanpham)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/loaisanpham/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const loaisanphamService = new LoaisanphamService()
export default loaisanphamService