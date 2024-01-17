import { useEffect, useRef, useState } from 'react';
import './Courses.scss';
import axios from 'axios';
import CourseInfoForm from './CourseInfoForm';
import { Tooltip } from 'bootstrap';
import DeleteCourse from './DeleteCourse';
import Pagination from '../../components/Pagination';
import { useOutletContext } from 'react-router';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
}

const Courses = () => {
    const { token, role, isAdmin } = useOutletContext();

    const formRef = useRef(null);
    const deleteCourseRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage, setCurrentPage] = useState('');

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    const getCourses = async (query = '') => {
        // setLoading(true);
        const response = await axios({
            method: 'get',
            url: `http://34.128.115.142:8080/api/courses?${query}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const { records, meta_record } = response?.data || {};
        setCourses(records || []);
        setMetaRecord((state) => ({
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || '',
        }));
    };

    useEffect(() => {
        getCourses(currentPage);
    }, [currentPage]);

    return (
        <>
            {isAdmin ? (
                <>
                    <CourseInfoForm
                        ref={formRef}
                        token={token}
                        getCourses={getCourses}
                    />
                    <DeleteCourse ref={deleteCourseRef} token={token} />
                </>
            ) : null}
            <div className='d-flex justify-content-between w-100 mb-4'>
                <h2 className='fw-bold mb-0'>Khóa học</h2>
                {isAdmin ? (
                    <button
                        type='button'
                        className='btn btn-danger fw-semibold'
                        data-bs-toggle='modal'
                        data-bs-target='#courseInfo'
                        onClick={() =>
                            formRef?.current?.updateInfo({ formType: 'add' })
                        }
                    >
                        <i className='fa-solid fa-plus me-2'></i>
                        Thêm khóa học
                    </button>
                ) : (
                    <div />
                )}
            </div>
            {courses.length ? (
                <>
                    <Pagination
                        metaRecord={metaRecord}
                        setCurrentPage={setCurrentPage}
                    />
                    <table className='mt-3 table table-hover border'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Tên khóa học</th>
                                <th scope='col'>Mô tả</th>
                                <th scope='col'>Năm học</th>
                                <th scope='col'>Điều kiện</th>
                                <th scope='col'>Ngành học</th>
                                <th scope='col'>Ngày tạo</th>
                                <th scope='col'>Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, courseIdx) => (
                                <tr key={courseIdx}>
                                    {Object.values(course).map(
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
                                            data-bs-target='#courseInfo'
                                            onClick={() =>
                                                formRef?.current?.updateInfo({
                                                    ...course,
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
                                            data-bs-target='#deleteCourse'
                                            onClick={() =>
                                                deleteCourseRef?.current?.updateInfoToDelete(
                                                    {
                                                        id: course.id,
                                                        name: course.name,
                                                    }
                                                )
                                            }
                                        >
                                            <i
                                                className='fa-solid fa-trash'
                                                data-bs-toggle='tooltip'
                                                data-bs-placement='top'
                                                data-bs-custom-class='custom-tooltip'
                                                data-bs-title='Xóa ngành học'
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
                    Không có khóa học
                </div>
            )}
        </>
    );
};

export default Courses;
