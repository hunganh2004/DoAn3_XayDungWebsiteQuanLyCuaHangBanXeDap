
class LoainguoidungService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/loainguoidung/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/loainguoidung/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/loainguoidung/all`)
                .then(res => res.json())
    }
    addNew(loainguoidung) {
        return fetch('http://localhost:3456/loainguoidung',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loainguoidung)
        })
                .then(res => res.json())
    }
    update(loainguoidung) {
        return fetch('http://localhost:3456/loainguoidung', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loainguoidung)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/loainguoidung/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const loainguoidungService = new LoainguoidungService()
export default loainguoidungService