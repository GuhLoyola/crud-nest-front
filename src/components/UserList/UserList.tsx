import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { User } from '../../interfaces/user.interface';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [updatedUser, setUpdatedUser] = useState<{ name: string, email: string }>({ name: '', email: '' })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await userService.getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: number) => {
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            alert('Usuário removido com sucesso!')
        } catch (error) {
            console.log('Erro ao deletar o usuário: ', error);
        }
    }

    const openModal = (user: User) => {
        setSelectedUser(user);
        setUpdatedUser({ name: user.name, email: user.email });
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedUser) {
            try {
                await userService.updateUser(selectedUser.id, updatedUser)
                setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)))
                alert('Usuário atualizado com sucesso!')

                closeModal();
            } catch (error) {
                console.log('Erro ao atualizar o usuário: ', error);
            }
        }
    }

    return (
        <div className='bg-gray-200 flex flex-col h-screen justify-center items-center'>
            <div className='bg-white p-4 rounded text-center md:w-[40%]'>
                <h1 className='text-xl mb-5 pb-1 border-b'>Lista de Usuários</h1>
                <ul className='gap-5 flex flex-col'>
                    {users.map((user) => (
                        <li key={user.id} className='text-lg bg-gray-300 px-5 py-2 rounded gap-5 flex justify-between items-center'>
                            {user.name}
                            <div className="flex gap-2">
                                <button className='bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all ease-in duration-200'
                                    onClick={() => openModal(user)}>
                                    <MdEdit />
                                </button>
                                <button className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all ease-in duration-200'
                                    onClick={() => handleDelete(user.id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <Link to='/add-user' className='bg-purple-500 mt-5 block py-3 px-7 rounded-full text-white hover:bg-purple-700 transition-all ease-in-out duration-300'>
                    Cadastrar Usuário
                </Link>

                <Link to='/' className='underline text-purple-500 block mt-2'>Voltar para o home</Link>
            </div>

            {showModal && selectedUser && (
                <div className='fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center'>
                    <div className='bg-white rounded shadow-md md:p-8 p-4 md:w-[30%] flex flex-col text-center mx-10 md:mx-0 relative'>
                        <h2 className='md:text-2xl text-lg border-b pb-3 my-3'>Editar usuário</h2>

                        <div className='flex flex-col gap-4 mt-3'>
                            <input type="text" placeholder='Nome' value={updatedUser.name}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                                className='py-3 px-7 bg-gray-200 rounded' />
                            <input type="text" placeholder='Email' value={updatedUser.email}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                                className='py-3 px-7 bg-gray-200 rounded' />
                        </div>

                        <button type='submit' onClick={handleUpdate} className='mt-5 bg-purple-500 text-white rounded-full py-2 hover:bg-purple-700 transition-all ease-in-out duration-300'>
                            Atualizar
                        </button>

                        <button className='close-btn' onClick={closeModal}>
                            <IoClose />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserList;