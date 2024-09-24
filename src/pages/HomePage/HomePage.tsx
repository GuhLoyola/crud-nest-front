import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl mb-5">CRUD Api</h1>
      <p className="mb-5 px-5 text-center">
        Seja bem vindo a minha aplicação, aqui você pode gerenciar tanto usuários como cursos. Escolha um e se divirta 😊
      </p>
      <div className="flex gap-5">
        <Link to='/user' className="bg-purple-500 text-white py-3 px-7 rounded hover:bg-purple-700
        transition-all ease-in-out duration-300">
          Usuários
        </Link>
        <Link to='/courses' className="bg-purple-500 text-white py-3 px-7 rounded hover:bg-purple-700 transition-all ease-in-out duration-300">
          Cursos
        </Link>
      </div>
    </div>
  )
}

export default HomePage