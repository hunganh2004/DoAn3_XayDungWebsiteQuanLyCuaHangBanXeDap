
class KhuyenmaiService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/khuyenmai/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/khuyenmai/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/khuyenmai/all`)
                .then(res => res.json())
    }
    addNew(khuyenmai) {
        return fetch('http://localhost:3456/khuyenmai',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khuyenmai)
        })
                .then(res => res.json())
    }
    update(khuyenmai) {
        return fetch('http://localhost:3456/khuyenmai', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khuyenmai)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/khuyenmai/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const khuyenmaiService = new KhuyenmaiService()
export default khuyenmaiService