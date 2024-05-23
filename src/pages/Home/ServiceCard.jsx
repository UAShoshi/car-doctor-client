import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const ServiceCard = ({service}) => {

  const {_id, title, img, price} = service;

  return (
    <div>
      <div className="card border border-base-300">
  <figure className="px-10 pt-10">
    <img src={img} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body px-10">
    <h2 className="card-title font-bold">{title}</h2>
    <div className="flex">
    <p className="text-red-500 font-bold">price: ${price}</p>
    <Link to={`/checkout/${_id}`}>
    <button><GoArrowRight className="text-2xl text-red-500"></GoArrowRight></button>
    </Link>
    </div>
  </div>
</div>
    </div>
  );
};

export default ServiceCard;