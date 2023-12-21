import { useEffect, useRef, useState } from 'react';
import './Students.scss';
import axios from 'axios';
import StudentInfoForm from './StudentInfoForm';
import { Tooltip } from 'bootstrap';
import DeleteStudent from './DeleteStudent';
import Pagination from '../../components/Pagination';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str); 
    return d instanceof Date && !isNaN(d.getTime());
}

const Students = ({ token }) => {
    const formRef = useRef(null);
    const deleteStudentRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage,setCurrentPage] = useState('');

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

    const getStudents = async (query = '') => {
        // setLoading(true);
        const response = await axios({
            method: 'get',
            url: `http://34.128.115.142:8080/api/students?${query}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        
        const { records, meta_record } = response?.data || {};
        setStudents(records || []);
        setMetaRecord(state => ({ 
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || ''
        }));
    }

    useEffect(() => {
        getStudents(currentPage);
    }, [currentPage]);

    if (students.length) return (
        <>
            <StudentInfoForm ref={formRef} token={token} getStudents={getStudents}/>
            <DeleteStudent ref={deleteStudentRef} token={token} />
            <div className="d-flex justify-content-between w-100 mb-4">
                <h2 className="fw-bold mb-0">Sinh viên</h2>
                <button
                    type='button'
                    className="btn btn-danger fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#studentInfo"
                    onClick={() => formRef?.current?.updateInfo({ formType: 'add' })}
                >
                    <i className="fa-solid fa-plus me-2"></i>
                    Thêm sinh viên
                </button>
            </div>
            <Pagination metaRecord={metaRecord} setCurrentPage={setCurrentPage} />
            <table className="mt-3 table table-hover border">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Năm sinh</th>
                        <th scope="col">Số tín chỉ</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tên đăng nhập</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Ngày cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, studentIdx) => (<tr key={studentIdx}>
                        {Object.values(student).map((value, valueIdx) => {
                            return <td key={valueIdx} scope={!valueIdx ? 'row' : ''}>{isIsoDate(value) ?  new Date(value).toLocaleDateString() : value}</td>
                        })}
                        <td className='table-actions d-flex align-items-center'>
                            <button 
                                className='action' 
                                data-bs-toggle="modal"
                                data-bs-target="#studentInfo"
                                onClick={() => formRef?.current?.updateInfo({ ...student, formType: 'edit' })}
                            >
                                <i 
                                    className="fa-solid fa-pen"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="Thay đổi thông tin"    
                                ></i>
                            </button>
                            <button 
                                className='action'
                                data-bs-toggle="modal"
                                data-bs-target="#deleteStudent"
                                onClick={() => deleteStudentRef?.current?.updateInfoToDelete({ id: student.id, name: student.name })}
                            >
                                <i 
                                    className="fa-solid fa-trash"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="Xóa sinh viên"    
                                ></i>
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <Pagination metaRecord={metaRecord} setCurrentPage={setCurrentPage} />
        </>
    );
};

export default Students;