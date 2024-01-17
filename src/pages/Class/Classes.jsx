import { useEffect, useRef, useState } from 'react';
import './Classes.scss';
import axios from 'axios';
import ClassInfoForm from './ClassInfoForm';
import { Tooltip } from 'bootstrap';
import DeleteClass from './DeleteClass';
import Pagination from '../../components/Pagination';
import { useLocation, useOutletContext } from 'react-router';
import { Link } from 'react-router-dom';

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
}

const Classes = ({ title = 'Lớp học', type = null }) => {
    const { token, role, isAdmin } = useOutletContext();
    const { pathname } = useLocation();
    const isStudent = role === 'STUDENT';

    const formRef = useRef(null);
    const deleteClassRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [metaRecord, setMetaRecord] = useState({});
    const [currentPage, setCurrentPage] = useState('limit=10');

    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    const getClasses = async (query = '') => {
        const baseUrl = 'http://34.128.115.142:8080/api/classes';
        let url;
        switch (role) {
            case 'ADMIN':
                url = baseUrl + '?';
                break;
            case 'PROFESSOR':
                url = baseUrl + '/professors' + '?';
                break;
            case 'STUDENT':
                if (type === 'open') {
                    url = baseUrl + '?';
                } else if (type === 'registered_success') {
                    url = baseUrl + '/students?status=SUCCESS&';
                }
                break;
            default:
                break;
        }
        url += query;

        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const { records, meta_record } = response?.data || {};
        setClasses(records || []);
        setMetaRecord((state) => ({
            prev_query: meta_record?.prev_query || '',
            next_query: meta_record?.next_query || '',
        }));
    };

    useEffect(() => {
        getClasses(currentPage);
    }, [currentPage, pathname]);

    return (
        <>
            {isAdmin ? (
                <>
                    <ClassInfoForm
                        ref={formRef}
                        token={token}
                        getClasses={getClasses}
                    />
                    <DeleteClass ref={deleteClassRef} token={token} />
                </>
            ) : null}
            <div className='d-flex justify-content-between w-100 mb-4'>
                <h2 className='fw-bold mb-0'>{title}</h2>
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
                        Thêm lớp học
                    </button>
                ) : (
                    <div />
                )}
            </div>
            {classes.length ? (
                <>
                    <Pagination
                        metaRecord={metaRecord}
                        setCurrentPage={setCurrentPage}
                    />
                    <table className='mt-3 table table-hover border'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Tên lớp học</th>
                                <th scope='col'>Mã khóa học</th>
                                <th scope='col'>Mã giảng viên</th>
                                <th scope='col'>Mã phòng học</th>
                                <th scope='col'>Số sinh viên</th>
                                <th scope='col'>Tiết bắt đầu</th>
                                <th scope='col'>Tiết kết thúc</th>
                                <th scope='col'>Ngày trong tuần</th>
                                <th scope='col'>Ngày tạo</th>
                                <th scope='col'>Ngày cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classV, classIdx) => (
                                <tr key={classIdx}>
                                    {Object.values(classV).map(
                                        (value, valueIdx) => {
                                            return (
                                                <td
                                                    key={valueIdx}
                                                    scope={
                                                        !valueIdx ? 'row' : ''
                                                    }
                                                >
                                                    {valueIdx === 0 &&
                                                    role === 'PROFESSOR' ? (
                                                        <Link
                                                            to={`/sinh-vien?class_id=${value}`}
                                                            // state={{
                                                            //     classId: value,
                                                            // }}
                                                        >
                                                            {value}
                                                        </Link>
                                                    ) : isIsoDate(value) ? (
                                                        new Date(
                                                            value
                                                        ).toLocaleDateString()
                                                    ) : (
                                                        value
                                                    )}
                                                </td>
                                            );
                                        }
                                    )}
                                    {isAdmin ? (
                                        <td className='table-actions d-flex align-items-center'>
                                            <button
                                                className='action'
                                                data-bs-toggle='modal'
                                                data-bs-target='#courseInfo'
                                                onClick={() =>
                                                    formRef?.current?.updateInfo(
                                                        {
                                                            ...classV,
                                                            formType: 'edit',
                                                        }
                                                    )
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
                                                data-bs-target='#deleteClass'
                                                onClick={() =>
                                                    deleteClassRef?.current?.updateInfoToDelete(
                                                        {
                                                            id: classV.id,
                                                            name: classV.name,
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
                                    ) : isStudent ? (
                                        <td className='table-actions d-flex align-items-center'>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => {
                                                    try {
                                                        axios({
                                                            method:
                                                                type === 'open'
                                                                    ? 'post'
                                                                    : 'put',
                                                            url: 'http://34.128.115.142:8080/api/registrations',
                                                            data: {
                                                                class_id:
                                                                    classV.id,
                                                            },
                                                            headers: {
                                                                Accept: 'application/json',
                                                                'Content-Type':
                                                                    'application/json',
                                                                Authorization:
                                                                    token,
                                                            },
                                                        });
                                                    } catch (err) {
                                                        console.log(err);
                                                    }
                                                }}
                                            >
                                                {type === 'open'
                                                    ? 'Đăng kí'
                                                    : 'Hủy đăng kí'}
                                            </button>
                                        </td>
                                    ) : null}
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
                    Không có lớp học
                </div>
            )}
        </>
    );
};

export default Classes;
