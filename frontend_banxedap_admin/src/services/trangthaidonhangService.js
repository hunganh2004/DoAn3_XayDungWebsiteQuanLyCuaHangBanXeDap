
class TrangthaidonhangService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/trangthaidonhang/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/trangthaidonhang/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/trangthaidonhang/all`)
                .then(res => res.json())
    }
    addNew(trangthaidonhang) {
        return fetch('http://localhost:3456/trangthaidonhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trangthaidonhang)
        })
                .then(res => res.json())
    }
    update(trangthaidonhang) {
        return fetch('http://localhost:3456/trangthaidonhang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trangthaidonhang)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/trangthaidonhang/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const trangthaidonhangService = new TrangthaidonhangService()
export default trangthaidonhangService