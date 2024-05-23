import person from '../../assets/images/about_us/person.jpg';
import parts from '../../assets/images/about_us/parts.jpg';

const About = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className='relative lg:w-1/2'>
          <img src={person} className="lg:w-3/4 rounded-lg shadow-2xl" />
          <img src={parts} className="lg:w-1/2 lg:absolute lg:right-5 lg:top-1/2 rounded-lg border-t-8 
          border-l-8 border-white shadow-2xl" />
        </div>
        <div className='lg:w-1/2 p-4'>
          <h1 className='text-red-600 font-bold'>About Us</h1>
          <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
          <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.</p>
          <p className='pb-6'>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
          <button className="btn btn-error text-white">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;