
class SanphamService {
    getPagination(pageSize, currentPage) {
        return fetch(`http://localhost:3456/sanpham/pagination?pageSize=${pageSize}&pageNumber=${currentPage}`)
                .then(res => res.json())
    }
    getPaginationSearch(searchValue, pageSize, currentPage) {
        return fetch(`http://localhost:3456/sanpham/pagination/search?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${ currentPage}`)
                .then(res => res.json())
    }
    getAll() {
        return fetch(`http://localhost:3456/sanpham/all`)
                .then(res => res.json())
    }
}
const sanphamService = new SanphamService()
export default sanphamService