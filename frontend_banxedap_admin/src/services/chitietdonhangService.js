
class ChitietdonhangService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/chitietdonhang/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/chitietdonhang/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/chitietdonhang/all`)
                .then(res => res.json())
    }
    addNew(chitietdonhang) {
        return fetch('http://localhost:3456/chitietdonhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chitietdonhang)
        })
                .then(res => res.json())
    }
    update(chitietdonhang) {
        return fetch('http://localhost:3456/chitietdonhang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chitietdonhang)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/chitietdonhang/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const chitietdonhangService = new ChitietdonhangService()
export default chitietdonhangService