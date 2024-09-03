import { Card,CardBody } from "reactstrap"
import {Link} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';
import './tour-card.css'
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({tour}) => {
   const {_id,title,photo,city,price,featured,avgRating,reviews}=tour;
   const {totalRating,averageRating}= calculateAvgRating(reviews);
  return (
    <div className="tour_card">
       <Card >
          <div className="tour_img">
              <img src={photo} alt="tour-img"></img>
             {featured &&  <span>Featured</span>} 
          </div>
       </Card>
       <CardBody>
        <div className="card_top d-flex align-items-center justify-content-between">
             <span className="tour_location d-flex align-items-center gap-1">
             <i className="ri-map-pin-line"></i>{city}
             </span>
             <span style={{padding:"7px"}} className="tour_rating d-flex align-items-center gap-1 ">
             <i className="ri-star-fill"></i>
             {averageRating === 0 ? null :averageRating}
             {
               totalRating === 0?null:( <span>({reviews.length})</span>)
             }
            
             </span>
             </div>
             <h5 className="tour_title"><Link to={`/tours/${_id}`}>{title}</Link></h5>
             <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
                <h5 style={{padding:"7px"}}>${price} <span> /per person</span></h5>
                <button className="btn booking_btn">
                    <Link to={`/tours/${_id}`}>Book Now</Link>

                </button>


             </div>
       </CardBody>
    </div>
  )
}

export default TourCard
