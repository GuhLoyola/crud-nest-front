import { useEffect, useState } from "react";
import { Course } from "../../interfaces/course.interface";
import { courseService } from "../../services/coursesService";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [updatedCourse, setUpdatedCourse] = useState<{ title: string; description: string }>({ title: '', description: '' });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courseData = await courseService.getCourses();
                setCourses(courseData);
            } catch (error) {
                console.log('Erro ao buscar cursos: ', error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId: number) => {
        try {
            await courseService.deleteCourse(courseId);
            setCourses(courses.filter(course => course.id !== courseId));
            alert('Curso removido com sucesso!');
        } catch (error) {
            console.log('Erro ao deletar curso:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCourse) {
            try {
                await courseService.updateCourse(selectedCourse.id, updatedCourse);
                setCourses(courses.map(course => (course.id === selectedCourse.id ? { ...course, ...updatedCourse } : course)));
                alert('Curso atualizado com sucesso!');
                closeModal();
            } catch (error) {
                console.log('Erro ao atualizar o curso: ', error);
            }
        }
    };

    const openModal = (course: Course) => {
        setSelectedCourse(course);
        setUpdatedCourse({ title: course.title, description: course.description }); // Preenche os dados do curso selecionado
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    return (
        <div className='bg-gray-200 flex flex-col h-screen justify-center items-center'>
            <div className='bg-white p-4 rounded text-center'>
                <h1 className='text-xl mb-5 pb-1 border-b'>Lista de Cursos</h1>
                <ul className='gap-5 flex flex-col'>
                    {
                        courses.map((course) => (
                            <li key={course.id} className='md:text-lg bg-gray-300 px-5 py-2 rounded gap-3 flex flex-col md:flex-row justify-between items-center'>
                                {course.title}
                                <div className="flex gap-2">
                                    <button className='bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all ease-in duration-200'
                                        onClick={() => openModal(course)}>
                                        <MdEdit />
                                    </button>
                                    <button className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all ease-in duration-200'
                                        onClick={() => handleDelete(course.id)}>
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <Link to='/add-course' className='bg-purple-500 mt-5 block py-3 px-7 rounded-full text-white hover:bg-purple-700 transition-all ease-in-out duration-300'>
                    Cadastrar curso
                </Link>

                <Link to='/' className='underline text-purple-500 block mt-2'>Voltar para o home</Link>
            </div>

            {
                showModal && selectedCourse && (
                    <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                        <div className="bg-white rounded shadow-md md:p-8 p-4 md:w-[30%] flex flex-col text-center mx-10 md:mx-0 relative">
                            <h2 className='md:text-2xl text-lg border-b pb-1 mb-5'>Editar curso</h2>
                            <div className="flex flex-col gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Título" 
                                    value={updatedCourse.title}
                                    onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
                                    className="bg-gray-200 px-7 py-3 rounded"
                                    required
                                />
                                <textarea
                                    placeholder="Descrição" 
                                    value={updatedCourse.description}
                                    onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
                                    className="resize-none bg-gray-200 md:px-7 py-3 px-3 h-36 rounded" 
                                    required
                                />
                            </div>

                            <button onClick={handleUpdate} className="mt-5 bg-purple-500 text-white rounded-full py-2 hover:bg-purple-700 transition-all ease-in-out duration-300">
                                Atualizar
                            </button>

                            <button className="close-btn" onClick={closeModal}>
                                <IoClose />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CourseList;
