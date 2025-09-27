
class AnhsanphamService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/anhsanpham/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/anhsanpham/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    addNew(anhsanpham) {
        return fetch('http://localhost:3456/anhsanpham',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anhsanpham)
        })
                .then(res => res.json())
    }
    update(anhsanpham) {
        return fetch('http://localhost:3456/anhsanpham', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anhsanpham)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/anhsanpham/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const anhsanphamService = new AnhsanphamService()
export default anhsanphamService