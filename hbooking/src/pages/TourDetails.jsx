import "../styles/tour_details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import { useRef, useState, useEffect,useContext } from "react";
import axios from "axios";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tour, setTour] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const {user}=useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tours/${id}`);
        window.scroll(0,0)
        setTour(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tour) return <p>Tour not found</p>;

  const { photo, title, desc, price, address, reviews, city, maxGroupSize, distance } = tour;
  const { totalRating, averageRating } = calculateAvgRating(reviews);
  console.log(averageRating)
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
   
   try {
    if (!user || user===undefined || user===null) {
      alert('Please sign in')
      
    }
    console.log(user.username);
    const reviewObj ={
      username:user?.username,
      reviewText,
      rating:totalRating
    }
    const res = await fetch(`${BASE_URL}/review/${id}`,{
      method:'post',
      headers:{
        'content-type':'application/json'

      },
      credentials:'include',
      body:JSON.stringify(reviewObj)
    })
    const result = await res.json()
    if (!res.ok) {
     return alert(result.message);
      
    }
    alert(result.message)


   } catch (error) {
    alert(error.message)
    
   }
    // Implement API call to submit review
  };

  return (
    <>
     <section>
        <Container>
          {
            loading && <h4 className="text-center pt-5">Loading....</h4>
          }
          {
            error && <h4 className="text-center pt-5">{error}</h4>
          }
          {!loading && !error && (<Row>
            <Col lg="8">
              <div className="tour_content">
                <img src={photo} alt={title} />
                <div className="tour_info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span style={{ padding: "7px" }} className="tour_rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: '#ffa000' }}></i>
                      {averageRating === 0 ? 'Not rated' : averageRating}
                      {totalRating !== 0 && <span>({reviews?.length})</span>}
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>
                  <div className="tour_extra-details">
                    <span><i className="ri-map-pin-2-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>${price}/per person</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                  </div>
                
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                  
                <div className="tour_reviews mt-4">
                  <h4 style={{ marginTop: '1rem' }}>Reviews ({reviews?.length || 0} reviews)</h4>
                  <Form onSubmit={SubmitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                      <span onClick={()=>setTourRating(1)}>1 <i className="ri-star-s-fill"></i></span>
                      <span onClick={()=>setTourRating(2)} >2 <i className="ri-star-s-fill"></i></span>
                      <span onClick={()=>setTourRating(3)}>3 <i className="ri-star-s-fill"></i></span>
                      <span onClick={()=>setTourRating(4)}>4 <i className="ri-star-s-fill"></i></span>
                      <span onClick={()=>setTourRating(5)}>5 <i className="ri-star-s-fill"></i></span>

                    </div>
                    <div className="review_input">
                      <input type="text" ref={reviewMsgRef} placeholder="share your thoughts"  required></input>
                      <button className="btn2 primary_btn2 text-white" type="submit">
                            submit

                      </button>
                    </div>
                  </Form>
                  {reviews?.length === 0 ? (
                    <p>No reviews yet.</p>
                  ) : (
                    <ListGroup className="user_reviews">
                      {reviews.map((review, index) => (
                        <div className="review_item d-flex align-items-start gap-3" key={index}>
                          <img src={avatar} alt="User Avatar" className="avatar-img"/>
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5>{review.username}</h5>
                                <p style={{ marginBottom: '0.5rem', color: 'gray', fontSize: '0.875rem' }}>
                                  {new Date(review.createdAt).toLocaleDateString('en-US', options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-s-fill" style={{ color: '#ffa000', marginLeft: '0.5rem' }}></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  )}
                </div>
              </div>
            </Col>
            <Col lg='4'>
               <Booking tour={tour} avgRating={averageRating}/>

            </Col>
          </Row>)
          
          }
          
        </Container>
      </section>
      <Newsletter/>

 </>
  );
};

export default TourDetails;



