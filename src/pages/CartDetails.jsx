import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
// import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import { data } from "autoprefixer";


const CartDetails = () => {
  const { user } = useContext(AuthContext);
  const [cartDetails, setCartDetails] = useState([]);
  const axiosSecure = useAxiosSecure();

  const url = `/checkouts?email=${user?.email}`;
  useEffect(() => {
    // axios.get(url, {withCredentials: true})
    // .then(res => {
    //   setCartDetails(res.data);
    // })

    // fetch(url, {credentials: 'include'})
    //   .then(res => res.json())
    //   .then(data => setCartDetails(data))

    axiosSecure.get(url)
    .then(res => setCartDetails(res.data))
  }, [url, axiosSecure]);


  const handleDelete = id =>{
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
  
        fetch(`https://car-doctor-server-beta-silk.vercel.app/checkouts/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
          // console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
          title: "Deleted!",
          text: "Your coffee has been deleted.",
          icon: "success"
        }); 
        const remaining = cartDetails.filter(user => user._id !== id);
        setCartDetails(remaining);        
          }
        })
      }
    });
  }



  // send data to the server
  const handleCheckoutConfirm = id =>{
    fetch(`https://car-doctor-server-beta-silk.vercel.app/checkouts/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({status: 'pending'})
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: 'Good Luck !!!',
        text: 'Card updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      const remaining = cartDetails.filter(user => user._id !== id);
      const updated = cartDetails.find(user => user._id === id);
      updated.status = 'pending'
      const newCartDetails = [updated, ...remaining];
        setCartDetails(newCartDetails);
    }
  });
}
  

  return (
    <div>
      <h1 className="text-4xl">Your Cart Details: {cartDetails.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Img</th>
              <th>FirstName</th>
              <th>Price</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
              cartDetails.map(cartDetail =>
                <tr key={cartDetail._id}>
                  <th><button onClick={() => handleDelete(cartDetail._id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button></th>
                  <td><div className="avatar"><div className="w-24 rounded-xl">
                    {
                    cartDetail.img && <img src={cartDetail.img} alt="Avatar Tailwind CSS Component" />
                    }
                  </div></div></td>
                  <td>{cartDetail.firstName}</td>
                  <td>${cartDetail.price}</td>
                  <td>{cartDetail.date}</td>
                  <td>
                    {
                    cartDetail.status === 'pending' ? <span className="font-bold text-green-500 border border-green-500 rounded-lg p-3">Approved</span>:
                    <button onClick={() => handleCheckoutConfirm(cartDetail._id)} className="btn btn-error text-white">pending</button>
                    }
                    </td>
                </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartDetails;