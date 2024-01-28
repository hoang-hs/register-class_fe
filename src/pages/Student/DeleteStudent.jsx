import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DeleteStudent = forwardRef(function ({ token }, ref) {
    const [studentId, setStudentId] = useState(0);
    const [studentName, setStudentName] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfoToDelete({ id, name }) {
            setStudentId(id);
            setStudentName(name);
        },
    }));

    const deleteStudent = () => {
        axios({
            method: 'delete',
            url: `http://34.101.208.43:8080/api/students/${studentId}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    };

    return (
        <div
            ref={ref}
            className='modal fade'
            id='deleteStudent'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header border-bottom-0'>
                        <h1
                            className='modal-title fs-4 fw-bold'
                            id='staticBackdropLabel'
                        >
                            Xóa sinh viên {studentName || 'này'} khỏi hệ thống?
                        </h1>
                    </div>
                    <div className='modal-body'>
                        Thông tin của sinh viên đã xóa{' '}
                        <span className='fw-semibold text-dark'>
                            không thể khôi phục.
                        </span>
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-dark fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={deleteStudent}
                        >
                            Xóa sinh viên
                        </button>
                        <button
                            type='button'
                            className='btn btn-danger fw-semibold'
                            data-bs-dismiss='modal'
                        >
                            Không xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DeleteStudent;
