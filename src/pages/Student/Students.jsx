import { useEffect, useRef, useState } from 'react';
import './Students.scss';
import axios from 'axios';
import StudentInfoForm from './StudentInfoForm';
import { Tooltip } from 'bootstrap';
import DeleteStudent from './DeleteStudent';
import Pagination from '../../components/Pagination';
import { useOutletContext } from 'react-router';
import { useSearchParams } from 'react-router-dom';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
}

const Students = () => {
    const [searchParams, _] = useSearchParams();
    const { token, role, isAdmin } = useOutletContext();

    const class_id = searchParams.get('class_id');

    const formRef = useRef(null);
    const deleteStudentRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage, setCurrentPage] = useState(
        class_id ? `/classes?class_id=${class_id}` : ''
    );

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    const getStudents = async (query = '') => {
        // setLoading(true);
        const response = await axios({
            method: 'get',
            url: `http://34.101.208.43:8080/api/students${query}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const { records, meta_record } = response?.data || {};
        setStudents(records || []);
        setMetaRecord((state) => ({
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || '',
        }));
    };

    useEffect(() => {
        getStudents(currentPage);
    }, [currentPage]);

    return (
        <>
            {isAdmin ? (
                <>
                    <StudentInfoForm
                        ref={formRef}
                        token={token}
                        getStudents={getStudents}
                    />
                    <DeleteStudent ref={deleteStudentRef} token={token} />
                </>
            ) : null}
            <div className='d-flex justify-content-between w-100 mb-4'>
                <h2 className='fw-bold mb-0'>Sinh viên</h2>
                {isAdmin ? (
                    <button
                        type='button'
                        className='btn btn-danger fw-semibold'
                        data-bs-toggle='modal'
                        data-bs-target='#studentInfo'
                        onClick={() =>
                            formRef?.current?.updateInfo({
                                formType: 'add',
                            })
                        }
                    >
                        <i className='fa-solid fa-plus me-2'></i>
                        Thêm sinh viên
                    </button>
                ) : null}
            </div>

            {students.length ? (
                <>
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
                                <th scope='col'>Năm học</th>
                                <th scope='col'>Số tín chỉ</th>
                                <th scope='col'>Số điện thoại</th>
                                <th scope='col'>Tên đăng nhập</th>
                                <th scope='col'>Ngày tạo</th>
                                <th scope='col'>Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, studentIdx) => (
                                <tr key={studentIdx}>
                                    {Object.values(student).map(
                                        (value, valueIdx) => {
                                            return (
                                                <td
                                                    key={valueIdx}
                                                    scope={
                                                        !valueIdx ? 'row' : ''
                                                    }
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
                                            data-bs-target='#studentInfo'
                                            onClick={() =>
                                                formRef?.current?.updateInfo({
                                                    ...student,
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
                                            data-bs-target='#deleteStudent'
                                            onClick={() =>
                                                deleteStudentRef?.current?.updateInfoToDelete(
                                                    {
                                                        id: student.id,
                                                        name: student.name,
                                                    }
                                                )
                                            }
                                        >
                                            <i
                                                className='fa-solid fa-trash'
                                                data-bs-toggle='tooltip'
                                                data-bs-placement='top'
                                                data-bs-custom-class='custom-tooltip'
                                                data-bs-title='Xóa sinh viên'
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
            ) : (
                <div className='w-100 text-center text-secondary'>
                    Không có sinh viên
                </div>
            )}
        </>
    );
};

export default Students;
