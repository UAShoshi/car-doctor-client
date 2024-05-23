// import { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import ServiceCard from "./ServiceCard";


// DRY ===> Do not Repeat yourSelf
const Service = () => {
  const services = useServices();
//   const [services, setServices] = useState([]);

//   useEffect(() =>{
//     fetch('http://localhost:5000/services')
//     .then(res => res.json())
//     .then(data => setServices(data))
//   }, [])

  return (
    <div>
      <div className="text-center space-y-5">
        <h1 className="font-bold text-red-600">Service</h1>
        <h1 className="text-4xl font-bold">Our Service Area</h1>
        <p className="pb-10">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          services.map(service => <ServiceCard 
            key={service._id}
            service={service}
          ></ServiceCard>)
        }
      </div>
      <div className="flex items-center justify-center pt-10">
      <button className="btn btn-outline btn-error">More Services</button>
      </div>
    </div>
  );
};

export default Service;