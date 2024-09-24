import { useState } from "react";
import { courseService } from "../../services/coursesService";
import { Link } from "react-router-dom";

const CourseForm = () => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();      

        try {
            const newCourse = { title, description }
            await courseService.createCourse(newCourse);
            alert('Curso cadastrado com sucesso!');
            setTitle('')
            setDescription('')
        } catch (error) {
            console.log('Erro ao cadastrar curso: ', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex h-screen justify-center items-center bg-gray-200">
            <div className="bg-white p-4 rounded-md gap-5 flex flex-col justify-center items-center">
                <h1 className="text-2xl border-b pb-1">Cadastre um curso</h1>
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nome do curso" className="bg-gray-300 px-5 py-2 rounded" />
                </div>
                <div>
                    <textarea name="description" value={description} className="resize-none bg-gray-300 rounded px-5 py-2 w-56 h-20" onChange={(e) => setDescription(e.target.value)} placeholder="Descrição do curso" />
                </div>
                <button type="submit" className="bg-purple-500 text-white px-7 py-3 rounded-full hover:bg-purple-700 transition-all ease-in-out duration-300">
                    Cadastrar
                </button>

                <Link to='/courses' className="underline text-purple-500">Voltar para lista</Link>
            </div>
        </form>
    )
}

export default CourseForm