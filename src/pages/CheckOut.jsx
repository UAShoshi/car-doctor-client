import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const CheckOut = () => {
  const service = useLoaderData();
  const {_id, title, price, img} = service;

  const {user} = useContext(AuthContext);

  const handleAddTour = event =>{
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const date = form.date.value;
    const email = user?.email;
    const yourPhone = form.yourPhone.value;
    const message = form.message.value;

    const order = {
      firstName, 
      date, 
      img,
      yourPhone, 
      email, 
      message,
      service: title,
      service_id: _id,
      price: price
    }
    // console.log(order);

    // send data to the server
    fetch('https://car-doctor-server-beta-silk.vercel.app/checkouts', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (data.insertedId) {
        Swal.fire({
          title: 'Good Luck !!!',
          text: 'Card added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    })
  }
  

  return (
    <div className="bg-[#F4F3F0] p-24">
      <h1 className="text-4xl font-extrabold">Check Out</h1>
      <form onSubmit={handleAddTour}>
        <div className="md:flex gap-3 mb-8">
          <label className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text font-bold"></span>
            </div>
            <input type="text" name="firstName" placeholder="First Name" className="input w-full" />
          </label>
          <label className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text font-bold"></span>
            </div>
            <input type="date" name="date" placeholder="Date" className="input w-full" />
          </label>
        </div>
        <div className="md:flex gap-3 mb-8">
          <label className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text font-bold"></span>
            </div>
            <input type="text" name="yourPhone" placeholder="Your Phone" className="input w-full" />
          </label>
          <label className="form-control md:w-1/2">
            <div className="label">
              <span className="label-text font-bold"></span>
            </div>
            <input type="email" name="email" defaultValue={user?.email} placeholder="Your Email" className="input w-full" />
          </label>
        </div>
        <div className="md:flex gap-3 mb-8">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold"></span>
            </div>
            <textarea placeholder="Your Message" name="message" className="textarea textarea-lg w-full" ></textarea>
          </label>
        </div>
        <input type="submit" value="Order Confirm" className="btn btn-block bg-red-600 font-bold text-white" />
      </form>
    </div>
  );
};

export default CheckOut;