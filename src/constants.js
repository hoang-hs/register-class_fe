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
    STUDENT: [
        {
            index: true,
            element: <Navigate to='danh-sach-lop-mo' replace />,
            hidden: true,
        },
        {
            path: 'danh-sach-lop-mo',
            title: 'Danh sách lớp mở',
            element: <Classes title='Danh sách lớp mở' type='open' />,
        },
        {
            path: 'lop-da-dang-ki',
            title: 'Lớp đã đăng kí',
            element: (
                <Classes title='Lớp đã đăng kí' type='registered_success' />
            ),
        },
    ],
};

export const roles = [
    { role: 'STUDENT', label: 'Sinh viên' },
    { role: 'PROFESSOR', label: 'Giảng viên' },
    { role: 'ADMIN', label: 'Quản trị viên' },
];
