import Students from './pages/Student';
import Professor from './pages/Professor';
import Rooms from './pages/Room';
import Courses from './pages/Course';
import Classes from './pages/Class';
import { Navigate } from 'react-router';

export const routes_by_role = {
    ADMIN: [
        {
            index: true,
            element: <Navigate to='sinh-vien' replace />,
            hidden: true,
        },
        {
            path: 'sinh-vien',
            title: 'Sinh viên',
            element: <Students />,
        },
        {
            path: 'giang-vien',
            title: 'Giảng viên',
            element: <Professor />,
        },
        {
            path: 'phong-hoc',
            title: 'Phòng học',
            element: <Rooms />,
        },
        {
            path: 'khoa-hoc',
            title: 'Khóa học',
            element: <Courses />,
        },
        {
            path: 'lop-hoc',
            title: 'Lớp học',
            element: <Classes />,
        },
    ],
    PROFESSOR: [
        {
            index: true,
            element: <Navigate to='lop-hoc' replace />,
            hidden: true,
        },
        {
            path: 'lop-hoc',
            title: 'Lớp học',
            element: <Classes />,
        },
        {
            path: 'sinh-vien',
            title: 'Sinh viên',
            element: <Students />,
            hidden: true,
        },
    ],
};

export const roles = [
    { role: 'STUDENT', label: 'Sinh viên' },
    { role: 'PROFESSOR', label: 'Giảng viên' },
    { role: 'ADMIN', label: 'Quản trị viên' },
];
