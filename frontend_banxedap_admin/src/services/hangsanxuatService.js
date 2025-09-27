
class HangsanxuatService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/hangsanxuat/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/hangsanxuat/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/hangsanxuat/all`)
                .then(res => res.json())
    }
    addNew(hangsanxuat) {
        return fetch('http://localhost:3456/hangsanxuat',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hangsanxuat)
        })
                .then(res => res.json())
    }
    update(hangsanxuat) {
        return fetch('http://localhost:3456/hangsanxuat', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hangsanxuat)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/hangsanxuat/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const hangsanxuatService = new HangsanxuatService()
export default hangsanxuatService