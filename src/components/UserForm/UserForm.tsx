import { useState } from "react"
import { userService } from "../../services/userService";
import { Link } from "react-router-dom";

const UserForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newUser = { name, email }
            await userService.createUser(newUser);
            alert('Usuário cadastrado com sucesso!');
            setName('')
            setEmail('')
        } catch (error) {
            console.log('Erro ao cadastrar usuário: ', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex h-screen justify-center items-center bg-gray-200">
            <div className="bg-white p-4 rounded-md gap-5 flex flex-col justify-center items-center w-[20%]">
                <h1 className="text-2xl border-b pb-1">Cadastre um usuário</h1>
                <div>
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome" className="bg-gray-300 px-5 py-2 rounded" />
                </div>
                <div>
                    <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu email" className="bg-gray-300 px-5 py-2 rounded" />
                </div>
                <button type="submit" className="bg-purple-500 text-white px-7 py-3 rounded-full hover:bg-purple-700 transition-all ease-in-out duration-300">
                    Cadastrar
                </button>

                <Link to='/user' className="underline text-purple-500">Voltar para lista</Link>
            </div>
        </form>
    )
}

export default UserForm