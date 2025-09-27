
class KhachhangService {

    getByNguoiDungId(id) {
        return fetch(`http://localhost:3456/khachhang/nguoidung/${id}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    update(khachhang) {
        return fetch('http://localhost:3456/khachhang', {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([khachhang])
        })
    }
}
const khachhangService = new KhachhangService()
export default khachhangService