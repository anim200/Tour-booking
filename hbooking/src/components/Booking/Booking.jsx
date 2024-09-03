import { useState,useContext } from 'react'
import './booking.css'
import {Form,FormGroup,ListGroup,ListGroupItem,Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import { AuthContext } from '../../context/AuthContext'


const Booking = ({tour,avgRating}) => {
    const {price,reviews,title}=tour
    const navigate =useNavigate()
    const {user} = useContext(AuthContext)
    const [booking,setBooking]=useState({
        userId: user && user._id,
        userEmail:user && user.email,
        tourName:title,
        fullName:'',
        phone:'',
        guestSize:1,
        bookAt:''
    })
    const handleChange = e =>{
        setBooking(prev=>({...prev,[e.target.id]:e.target.value}))

    }
    const serviceFee = 10
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)
    //send the data to the server
    const handleClick = async e=>{
        e.preventDefault();
        console.log(booking);
        try {
         if (!user || user===undefined || user===null) {
            return alert('Please sign in ')
         }
         const res= await fetch(`${BASE_URL}/Booking`,{
            method:'post',
            headers:{
               'content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(booking)
         })
         const result = await res.json()
         console.log(result)
         if (!res.ok) {
            return alert(result.message)
            
         }
         navigate('/thank-you')
         
        } catch (error) {
         alert(error.message)
        }
        
    }

  return (
    <div className='booking'>
       <div className='booking_top d-flex align-items-center justify-content-between'>
         <h3>${price}<span>/per person</span></h3>
         <span  className="tour_rating d-flex align-items-center">
                      <i className="ri-star-fill" style={{ color: '#ffa000' }}></i>
                      {avgRating === 0 ? 'Not rated' : avgRating}({reviews?.length})
                    
                    </span>
                    

       </div>
       <div className='booking_form'>
        <h5>Information</h5>
        <Form className='booking_info-form' onSubmit={handleClick}>
             <FormGroup>
                <input type='text' placeholder='Full Name' id="fullName" required onChange={handleChange}></input>
             </FormGroup>
             <FormGroup>
               <input type='tel' id="phone"  placeholder="phone" onChange={handleChange}></input>
             </FormGroup>
             <FormGroup className='d-flex align-items-center gap-3'>
                <input type='date' placeholder='' id="bookAt" required onChange={handleChange}></input>
                <input type='number' placeholder='Guest' id="guestSize" required onChange={handleChange}></input>
             </FormGroup>

        </Form>

       </div>
       <div className='booking_bottom'>
          <ListGroup>
             <ListGroupItem className='border-0 px-0'>
                <h5 className='d-flex align-items-center gap-1'>${price}<i className='ri-close-line'></i>1 person</h5>
                <span>{price}</span>


             </ListGroupItem>
             <ListGroupItem className='border-0 px-0'>
                <h5>Service Charge</h5>
                <span>{serviceFee}</span>


             </ListGroupItem>
             <ListGroupItem className='border-0 px-0 total'>
                <h5>Total</h5>
                <span>${totalAmount}</span>


             </ListGroupItem>
          </ListGroup>
          <Button className='btn primary_btn w-100 mt-4' onClick={handleClick}>Book Now</Button>

       </div>
    </div>
  )
}

export default Booking
