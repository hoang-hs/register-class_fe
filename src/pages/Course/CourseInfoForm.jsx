import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import TextInput from '../../components/TextInput';
import {Modal} from 'bootstrap';
import axios from 'axios';

const CourseInfoForm = forwardRef(function ({token, getCourses}, ref) {
    const [formType, setFormType] = useState('add');

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [conditions, setConditions] = useState('');
    const [year, setYear] = useState('');
    const [deptName, setDeptName] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfo(props) {
            setFormType(props.formType);

            setId(props.id || 0);
            setName(props.name || '');
            setDescription(props.description || '');
            setConditions(props.conditions || '');
            setYear(props.year || '');
            setDeptName(props.dept_name || '');
        },
    }));

    const modal = Modal.getInstance(document.querySelector('#courseInfo'));

    console.log(id);

    const addNewCourse = useCallback(() => {
        axios({
            method: 'post',
            url: `http://34.128.115.142:8080/api/courses`,
            data: {
                name,
                description,
                conditions: Array.from(parseInt(conditions)),
                year: parseInt(year),
                dept_name: deptName,

            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, name, description, conditions, year, deptName]);

    const updateCourseInfo = useCallback(() => {
        if (!id) return;
        let conditionsInput;
        if (conditions !== "") {
            conditionsInput = Array(parseInt(conditions));
        } else {
            conditionsInput = []
        }
        axios({
            method: 'put',
            url: `http://34.128.115.142:8080/api/courses/${id}`,
            data: {
                name,
                description,
                conditions: conditionsInput,
                year: parseInt(year),
                dept_name: deptName,
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, name, description, conditions, year, deptName]);

    const callToAction = () => {
        formType === 'add' ? addNewCourse() : updateCourseInfo();
        getCourses();
    };

    return (
        <div
            className='modal fade'
            id='courseInfo'
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
                            Thông tin khóa học
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body d-flex flex-column gap-3'>
                        <h5 className='fw-semibold mb-0 text-secondary'>
                            Thông tin
                        </h5>
                        <TextInput
                            label='Tên khóa học'
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            type='Mô tả'
                            label='Mô tả'
                            value={description}
                            setValue={setDescription}
                        />
                        <TextInput
                            label='Năm học'
                            value={year}
                            setValue={setYear}
                        />
                        <TextInput
                            type='Điều kiện'
                            label='Điều kiện'
                            value={conditions}
                            setValue={setConditions}
                        />
                        <TextInput
                            type='Ngành học'
                            label='Ngành học'
                            value={deptName}
                            setValue={setDeptName}
                        />
                    </div>
                    <div className='modal-footer border-top-0'>
                        <button
                            type='button'
                            className='btn btn-outline-secondary fw-semibold'
                            data-bs-dismiss='modal'
                        >
                            Đóng
                        </button>
                        <button
                            type='button'
                            className='btn btn-danger fw-semibold'
                            data-bs-dismiss='modal'
                            onClick={callToAction}
                        >
                            {formType === 'add'
                                ? 'Thêm khóa học'
                                : 'Cập nhật thông tin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CourseInfoForm;
