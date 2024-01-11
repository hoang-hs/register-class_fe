import { useEffect, useRef, useState } from 'react';
import './Professors.scss';
import axios from 'axios';
import ProfessorInfoForm from './ProfessorInfoForm';
import { Tooltip } from 'bootstrap';
import DeleteProfessor from './DeleteProfessor';
import Pagination from '../../components/Pagination';
import { useOutletContext } from 'react-router';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
}

const Professors = () => {
    const { token } = useOutletContext();

    const formRef = useRef(null);
    const deleteProfessorRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [professors, setProfessors] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage, setCurrentPage] = useState('');

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    const getProfessors = async (query = '') => {
        // setLoading(true);
        const response = await axios({
            method: 'get',
            url: `http://34.128.115.142:8080/api/professors?${query}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const { records, meta_record } = response?.data || {};
        setProfessors(records || []);
        setMetaRecord((state) => ({
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || '',
        }));
    };

    useEffect(() => {
        getProfessors(currentPage);
    }, [currentPage]);

    if (professors.length)
        return (
            <>
                <ProfessorInfoForm
                    ref={formRef}
                    token={token}
                    getProfessors={getProfessors}
                />
                <DeleteProfessor ref={deleteProfessorRef} token={token} />
                <div className='d-flex justify-content-between w-100 mb-4'>
                    <h2 className='fw-bold mb-0'>Giảng viên</h2>
                    <button
                        type='button'
                        className='btn btn-danger fw-semibold'
                        data-bs-toggle='modal'
                        data-bs-target='#professorInfo'
                        onClick={() =>
                            formRef?.current?.updateInfo({ formType: 'add' })
                        }
                    >
                        <i className='fa-solid fa-plus me-2'></i>
                        Thêm giảng viên
                    </button>
                </div>
                <Pagination
                    metaRecord={metaRecord}
                    setCurrentPage={setCurrentPage}
                />
                <table className='mt-3 table table-hover border'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Họ và tên</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Địa chỉ</th>
                            <th scope='col'>Số điện thoại</th>
                            <th scope='col'>Tên đăng nhập</th>
                            <th scope='col'>Ngày tạo</th>
                            <th scope='col'>Ngày cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professors.map((professor, professorIdx) => (
                            <tr key={professorIdx}>
                                {Object.values(professor).map(
                                    (value, valueIdx) => {
                                        return (
                                            <td
                                                key={valueIdx}
                                                scope={!valueIdx ? 'row' : ''}
                                            >
                                                {isIsoDate(value)
                                                    ? new Date(
                                                          value
                                                      ).toLocaleDateString()
                                                    : value}
                                            </td>
                                        );
                                    }
                                )}
                                <td className='table-actions d-flex align-items-center'>
                                    <button
                                        className='action'
                                        data-bs-toggle='modal'
                                        data-bs-target='#professorInfo'
                                        onClick={() =>
                                            formRef?.current?.updateInfo({
                                                ...professor,
                                                formType: 'edit',
                                            })
                                        }
                                    >
                                        <i
                                            className='fa-solid fa-pen'
                                            data-bs-toggle='tooltip'
                                            data-bs-placement='top'
                                            data-bs-custom-class='custom-tooltip'
                                            data-bs-title='Thay đổi thông tin'
                                        ></i>
                                    </button>
                                    <button
                                        className='action'
                                        data-bs-toggle='modal'
                                        data-bs-target='#deleteProfessor'
                                        onClick={() =>
                                            deleteProfessorRef?.current?.updateInfoToDelete(
                                                {
                                                    id: professor.id,
                                                    name: professor.name,
                                                }
                                            )
                                        }
                                    >
                                        <i
                                            className='fa-solid fa-trash'
                                            data-bs-toggle='tooltip'
                                            data-bs-placement='top'
                                            data-bs-custom-class='custom-tooltip'
                                            data-bs-title='Xóa giảng viên'
                                        ></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    metaRecord={metaRecord}
                    setCurrentPage={setCurrentPage}
                />
            </>
        );
};

export default Professors;
