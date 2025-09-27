
class LohangService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/lohang/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/lohang/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    addNew(lohang) {
        return fetch('http://localhost:3456/lohang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lohang)
        })
                .then(res => res.json())
    }
    update(lohang) {
        return fetch('http://localhost:3456/lohang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lohang)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/lohang/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const lohangService = new LohangService()
export default lohangService