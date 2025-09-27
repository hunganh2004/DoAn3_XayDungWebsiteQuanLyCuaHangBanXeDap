
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

    update(nguoidung) {
        return fetch('http://localhost:3456/nguoidung', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nguoidung)
        })
    }
}
const nguoidungService = new NguoidungService()
export default nguoidungService