import { useEffect, useRef, useState } from 'react';
import './Students.scss';
import axios from 'axios';
import StudentInfoForm from './StudentInfoForm';

function prettify(str) {
    const words = str.match(/([^_]+)/g) || [];
    words.forEach(function(word, i) {
      words[i] = word[0].toUpperCase() + word.slice(1);
    });
    return words.join(' ');
};

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,}Z/.test(str)) return false;
    const d = new Date(str); 
    return d instanceof Date && !isNaN(d.getTime());
}

const Students = ({ token }) => {
    const formRef = useRef(null);
    // const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function getStudents() {
            // setLoading(true);
            const response = await axios({
                method: 'get',
                url: 'http://34.128.115.142:8080/api/students',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            setStudents(response?.data?.records || []);
            // setLoading(false);
        }
        getStudents();
    }, []);

    if (students.length) return (
        <>
            <StudentInfoForm ref={formRef} token={token}/>
            <div className="d-flex justify-content-between w-100">
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
            <table className="mt-3 table table-hover border">
                <thead>
                    <tr>{Object.keys(students[0]).map((attr, index) => (
                        <th key={index} scope="col">{prettify(attr)}</th>
                ))}</tr>
                </thead>
                <tbody>
                    {students.map((student, studentIdx) => (<tr key={studentIdx}>
                        {Object.values(student).map((value, valueIdx) => {
                            return <td key={valueIdx}>{isIsoDate(value) ?  new Date(value).toLocaleDateString() : value}</td>
                        })}
                        <td className='table-actions'>
                            <button 
                                className='action' 
                                data-bs-toggle="modal"
                                data-bs-target="#studentInfo"
                                onClick={() => formRef?.current?.updateInfo({ ...student, formType: 'edit' })}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className='action'><i className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </>
    );
};

export default Students;