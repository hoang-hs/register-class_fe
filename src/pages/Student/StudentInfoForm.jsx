import { forwardRef, useImperativeHandle, useState } from "react";
import TextInput from "../../components/TextInput";
import axios from "axios";

const StudentInfoForm = forwardRef(function ({ token }, ref) {
    const [formType, setFormType] = useState('add');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [year, setYear] = useState('');

    useImperativeHandle(ref, () => ({
        updateInfo(props) {
            setFormType(props.formType);

            setUsername(props.username || '');
            setPassword(props.password || '');
            setName(props.name || '');
            setEmail(props.email || '');
            setPhoneNumber(props.phone_number || '');
            setYear(props.year || '');
        }
    }));

    const addNewStudent = () => axios({
        method: 'post',
        url: 'http://34.128.115.142:8080/api/students',
        data: { username, password, name, email, phone_number: phoneNumber, year: parseInt(year)},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const updateStudentInfo = () => axios({
        method: 'put',
        url: 'http://34.128.115.142:8080/api/students/7',
        data: { username, name, email, phone_number: phoneNumber, year: parseInt(year)},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const callToAction = formType === 'add' ? addNewStudent : updateStudentInfo;

    return (
        <div 
            className="modal fade" 
            id='studentInfo' 
            data-bs-backdrop="static" 
            data-bs-keyboard="false" 
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel" 
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-bottom-0">
                        <h1 className="modal-title fs-4 fw-bold" id="staticBackdropLabel">Thông tin sinh viên</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex flex-column gap-3">
                        <TextInput label='Username' value={username} setValue={setUsername}/>
                        {formType === 'add' ? <TextInput type='password' label='Password' value={password}  setValue={setPassword}/> : null}
                        <TextInput label='Name' value={name}  setValue={setName}/>
                        <TextInput type='email' label='Email' value={email} setValue={setEmail}/>
                        <TextInput type='number' label='Phone Number' value={phoneNumber} setValue={setPhoneNumber}/>
                        <TextInput type='number' label='Year' value={year} setValue={setYear}/>
                    </div>
                    <div className="modal-footer border-top-0">
                        <button type="button" className="btn btn-outline-secondary fw-semibold" data-bs-dismiss="modal">Đóng</button>
                        <button 
                            type="button"
                            className="btn btn-danger fw-semibold"
                            onClick={callToAction}
                        >
                            {formType === 'add' ? 'Thêm sinh viên' : 'Cập nhật thông tin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default StudentInfoForm;