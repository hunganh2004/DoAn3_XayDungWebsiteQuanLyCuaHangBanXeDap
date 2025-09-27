
class DonhangService {
    addNew(donhang) {
        return fetch('http://localhost:3456/donhang',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([donhang])
        })
                .then(res => res.json())
    }
}
const donhangService = new DonhangService()
export default donhangService