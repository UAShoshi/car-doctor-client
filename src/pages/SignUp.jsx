import { Link } from "react-router-dom";
import img from '../assets/images/login/login.svg'
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext)


  const handleSignUp = e =>{
    e.preventDefault();
    const form = e.target;
    // const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password, name);


    createUser(email, password)
    .then(result => {
      const user = result.user;
      // console.log(user);
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
      <form onSubmit={handleSignUp} className="card-body">
      <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="Your name" className="input input-bordered" required />
        </div>
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
          <input className="btn bg-red-500 text-white" type="Submit" value="Sign up" />
        </div>
      </form>
      <p className="text-center">Already Have An Account ?<Link to="/login" className="text-[#F61414] font-semibold"> Login</Link></p>
    </div>
  </div>
</div>
  );
};

export default SignUp;