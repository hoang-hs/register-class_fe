import Students from "./pages/Student";
import Professor from "./pages/Professor";
import Rooms from "./pages/Room";
import Courses from "./pages/Course";
import Classes from "./pages/Class";

export const routes = [
    {
        path: '/sinh-vien',
        title: 'Sinh viên',
        element: <Students/>
    },
    {
        path: '/giang-vien',
        title: 'Giảng viên',
        element: <Professor/>
    },
    {
        path: '/phong-hoc',
        title: 'Phòng học',
        element: <Rooms/>
    },
    {
        path: '/khoa-hoc',
        title: 'Khóa học',
        element: <Courses/>
    },
    {
        path: '/lop-hoc',
        title: 'Lớp học',
        element: <Classes/>
    }
]

export const roles = [
    {role: 'STUDENT', label: 'Sinh viên'},
    {role: 'PROFESSOR', label: 'Giảng viên'},
    {role: 'ADMIN', label: 'Quản trị viên'}
];