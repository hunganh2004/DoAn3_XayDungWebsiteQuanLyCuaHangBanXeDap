
class DonhangService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/donhang/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/donhang/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    addNew(donhang) {
        return fetch('http://localhost:3456/donhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donhang)
        })
                .then(res => res.json())
    }
    update(donhang) {
        return fetch('http://localhost:3456/donhang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donhang)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/donhang/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const donhangService = new DonhangService()
export default donhangService