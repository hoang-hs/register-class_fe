import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import TextInput from '../../components/TextInput';
import {Modal} from 'bootstrap';
import axios from 'axios';

const ClassInfoForm = forwardRef(function ({token, getClasses}, ref) {
    const [formType, setFormType] = useState('add');

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [professorId, setProfessorId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [totalReserved, setTotalReserved] = useState('');
    const [weekday, setWeekday] = useState('');
    const [classStart, setClassStart] = useState('');
    const [classEnd, setClassEnd] = useState('');


    useImperativeHandle(ref, () => ({
        updateInfo(props) {
            setFormType(props.formType);

            setId(props.id || 0);
            setName(props.name || '');
            setCourseId(props.courseId || '');
            setProfessorId(props.professorId || '');
            setRoomId(props.roomId || '');
            setWeekday(props.weekday || '');
            setClassStart(props.classStart || '');
            setClassEnd(props.classEnd || '');
        },
    }));

    const modal = Modal.getInstance(document.querySelector('#courseInfo'));

    console.log(id);

    const addNewClasses = useCallback(() => {
        axios({
            method: 'post',
            url: `http://34.128.115.142:8080/api/classes`,
            data: {
                name,
                course_id: parseInt(courseId),
                professor_id: parseInt(professorId),
                room_id: parseInt(roomId),
                weekday: parseInt(weekday),
                class_start: parseInt(classStart),
                class_end: parseInt(classEnd)
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, name, courseId, professorId, roomId, weekday, classStart, classEnd]);

    const updateClassInfo = useCallback(() => {
        if (!id) return;
        axios({
            method: 'put',
            url: `http://34.128.115.142:8080/api/classes/${id}`,
            data: {
                name,
                course_id: parseInt(courseId),
                professor_id: parseInt(professorId),
                room_id: parseInt(roomId),
                weekday: parseInt(weekday),
                class_start: parseInt(classStart),
                class_end: parseInt(classEnd)
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    }, [id, name, courseId, professorId, roomId, weekday, classStart, classEnd]);

    const callToAction = () => {
        formType === 'add' ? addNewClasses() : updateClassInfo();
        getClasses();
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
                            label='Tên lớp học'
                            value={name}
                            setValue={setName}
                        />
                        <TextInput
                            type='Mã khóa học'
                            label='mã khóa học'
                            value={courseId}
                            setValue={setCourseId}
                        />
                        <TextInput
                            label='Mã giảng viên'
                            value={professorId}
                            setValue={setProfessorId}
                        />
                        <TextInput
                            type='Mã phòng học'
                            label='Mã phòng học'
                            value={roomId}
                            setValue={setRoomId}
                        />
                        <TextInput
                            type='Ngày trong tuần'
                            label='Ngày trong tuần'
                            value={weekday}
                            setValue={setWeekday}
                        />
                        <TextInput
                            type='Tiết bắt đầu'
                            label='Tiết bắt đầu'
                            value={classStart}
                            setValue={setClassStart}
                        />
                        <TextInput
                            type='Tiết kết thúc'
                            label='Tiết kết thúc'
                            value={classEnd}
                            setValue={setClassEnd}
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
                                ? 'Thêm lớp học'
                                : 'Cập nhật thông tin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ClassInfoForm;
