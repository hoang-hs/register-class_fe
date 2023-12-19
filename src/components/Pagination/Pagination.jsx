import './Pagination.scss';

const Pagination = ({ metaRecord, setCurrentPage }) => {
    const {
        next_query = '',
        prev_query = '',
    } = metaRecord;

    const prevPage = () => setCurrentPage(prev_query);
    const nextPage = () => setCurrentPage(next_query);

    return (
        <nav aria-label="">
            <ul className="pagination justify-content-end">
                <li className="page-item"><button 
                    className="page-link"
                    onClick={prevPage}
                    disabled={prev_query === ''}
                >
                    <i className="fa-solid fa-chevron-left me-2"></i>
                    Previous
                </button></li>
                <li className="page-item"><button 
                    className="page-link"
                    onClick={nextPage}
                    disabled={next_query === ''}
                >
                    Next
                    <i className="fa-solid fa-chevron-right ms-2"></i>
                </button></li>
            </ul>
        </nav>
    )
}

export default Pagination;