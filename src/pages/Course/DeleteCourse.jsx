import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';

const DeleteCourse = forwardRef(function ({ token }, ref) {
    const [courseId, setCourseId] = useState(0);
    const [courseName, setCourseName] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfoToDelete({ id, name }) {
            setCourseId(id);
            setCourseName(name);
        },
    }));

    const deleteCourse = () => {
        axios({
            method: 'delete',
            url: `http://34.101.208.43:8080/api/courses/${courseId}`,
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
            id='deleteCourse'
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
                            Xóa khóa học {courseName || 'này'} khỏi hệ thống?
                        </h1>
                    </div>
                    <div className='modal-body'>
                        Thông tin của khóa học đã xóa{' '}
                        <span className='fw-semibold text-dark'>
                            không thể khôi phục.
                        </span>
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-dark fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={deleteCourse}
                        >
                            Xóa khóa học
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

export default DeleteCourse;
