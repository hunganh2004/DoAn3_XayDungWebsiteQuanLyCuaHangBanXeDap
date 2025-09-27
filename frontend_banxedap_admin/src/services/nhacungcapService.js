
class NhacungcapService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/nhacungcap/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/nhacungcap/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/nhacungcap/all`)
                .then(res => res.json())
    }
    addNew(nhacungcap) {
        return fetch('http://localhost:3456/nhacungcap',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nhacungcap)
        })
                .then(res => res.json())
    }
    update(nhacungcap) {
        return fetch('http://localhost:3456/nhacungcap', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nhacungcap)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/nhacungcap/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const nhacungcapService = new NhacungcapService()
export default nhacungcapService