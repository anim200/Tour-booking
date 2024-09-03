import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ava1 from "../../assets/images/ava-1.jpg"
import ava2 from "../../assets/images/ava-2.jpg"
import ava3 from "../../assets/images/ava-3.jpg"



const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, // Keep this if you plan to have multiple slides
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>My experience was great</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava1} className="w-25 h-25 rounded-2" alt="Customer 1" />
          <div>
            <h5 className="mb-0 mt-3">Miftahul Islam</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>There are very customer friendly</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava2} className="w-25 h-25 rounded-2" alt="Customer 2" />
          <div>
            <h5 className="mb-0 mt-3">Mussarat Tales</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>This site is the best choice for travelling</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava3} className="w-25 h-25 rounded-2" alt="Customer 3" />
          <div>
            <h5 className="mb-0 mt-3">Farhan Karim</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

    </Slider>
  );
};

export default Testimonials;

