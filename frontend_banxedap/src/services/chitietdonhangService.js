
class ChitietdonhangService {
    addNew(chitietdonhang) {
        return fetch('http://localhost:3456/chitietdonhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chitietdonhang)
        })
                .then(res => res.json())
    }
}
const chitietdonhangService = new ChitietdonhangService()
export default chitietdonhangService