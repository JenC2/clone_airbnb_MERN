import Header from "../components/Header";
import {Link} from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-4 ">
      <Header />
      <div className="mt-20">
      <h1 className="text-3xl text-center mb-4">Login</h1>
      <form className="max-w-lg mx-auto">
        <input type="email" placeholder="example@gmail.com" />
        <input type="password" placeholder="password" />
        <button className="buttonRed">Login</button>
        <div className="text-center py-2 text-gray-500">Don't have an account yet? &nbsp;
        <Link className="underline text-black" to={'/register'}>Register now</Link></div>
      </form>
      </div>
    </div>
  );
}
