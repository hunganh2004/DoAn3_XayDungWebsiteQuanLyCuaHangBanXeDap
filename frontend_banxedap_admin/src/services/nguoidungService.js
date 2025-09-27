
class NguoidungService {
    register(new_user) {
        return fetch(`http://localhost:3456/nguoidung`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify([new_user])
        })
    }
    login (username, password) {
        return fetch(`http://localhost:3456/nguoidung/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify([{account: username, password: password}])
        })
                .then(res => res.json())
    }
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/nguoidung/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/nguoidung/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    addNew(nguoidung) {
        return fetch('http://localhost:3456/nguoidung',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nguoidung)
        })
                .then(res => res.json())
    }
    update(nguoidung) {
        return fetch('http://localhost:3456/nguoidung', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nguoidung)
        })
    }
    deleteByID(id) {
        return fetch('http://localhost:3456/nguoidung/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}
const nguoidungService = new NguoidungService()
export default nguoidungService