
class NhanvienService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/nhanvien/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/nhanvien/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    addNew(nhanvien) {
        return fetch('http://localhost:3456/nhanvien',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nhanvien)
        })
                .then(res => res.json())
    }
    update(nhanvien) {
        return fetch('http://localhost:3456/nhanvien', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nhanvien)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/nhanvien/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const nhanvienService = new NhanvienService()
export default nhanvienService