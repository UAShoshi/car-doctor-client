import { Link } from 'react-router-dom';
import img from '../assets/images/login/login.svg'
import useAuth from '../hooks/useAuth';
// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
  const {signin} = useAuth();
  // const { signin } = useContext(AuthContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  // console.log(location);

    const handleLogin = e =>{
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);

      signin(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <img src={img} alt="" />
    </div>
    <div className="card shrink-0 w-full max-w-sm border border-base-300 bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
      <h1 className="text-4xl font-bold text-center">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="Your email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" name='password' placeholder="Your password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <input className="btn bg-red-500 text-white" type="Submit" value="Sign In" />
        </div>
      </form>
      <p className="text-center">Have An Account ?<Link to="/signup" className="text-[#F61414] font-semibold"> Sign In</Link></p>
    </div>
  </div>
</div>
  );
};

export default Login;