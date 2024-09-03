import '../styles/home.css'
import { Container,Row,Col } from 'reactstrap'
import Subtitle from '../shared/Subtitle'
import 'remixicon/fonts/remixicon.css';
import SearchBar from '../shared/SearchBar';


import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';
import world from "../assets/images/world.png"
import hero from "../assets/images/hero-img01.jpg"
import video from "../assets/images/hero-video.mp4"
import hero2 from "../assets/images/hero-img02.jpg"
import experience from "../assets/images/experience.png"



const Home = () => {
  return (
    <>
     <section className='section'>
        <Container>
          <Row>
             <Col lg='6'>
               <div className='hero_content'>
                  <div className='hero_subtitle d-flex align-items-center'>
                    <Subtitle Subtitle={'Know Before You Go'}/>
                    <img src={world} alt='#'></img>
                  </div>
                  <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                  <p style={{ textAlign: 'justify' }}>Welcome to Travel World, your gateway to exploring the world&apos;s most breathtaking destinations. Whether you&apos;re seeking the serene beauty of tropical beaches, the rich cultural tapestry of historic cities, or the thrilling excitement of outdoor adventures, we&apos;ve got you covered. </p>
                  

               </div>
             </Col>
             <Col lg='2'>
               <div className='hero_img-box'>
                <img src={hero} alt=''></img>

               </div>
             </Col>
             <Col lg='2'>
               <div className='hero_img-box hero_video-box mt-4'>
                <video src={video} alt='' controls></video>

               </div>
             </Col>
             <Col lg='2'>
               <div className='hero_img-box mt-5'>
                <img src={hero2} alt=''></img>

               </div>
             </Col>
             <SearchBar/>
          </Row>
        </Container>
    </section>
    <section>
      <Container className="mt-5">
        <Row>
          <Col lg='3'>
             <h5 className="services_subtitle">What we serve</h5>
             <h2 className='services_title'>We offer our best services</h2>
             

          </Col>
          <ServiceList/>
        </Row>
      </Container>
    </section>
    <section>
       <Container className='mt-5'>
          <Row>
             <Col lg="12" className='mb-5'>
             <p className='sub'>Explore </p>
             <h2 className="featured_tour-title">Our featured tours</h2>
              
             </Col>
             <FeaturedTourList/>
          </Row>
       </Container>
    </section>
    <section>
      <Container className='mt-5'>
        <Row>
          <Col lg="6" >
           <div className='experience_content'>
            <p className='sub2'>Experience</p>
            <h2>With our all experiences <br/> we will serve you</h2>
            <p1>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit.
              <br/>
              Quas aliquam,hic tempora inventore suscipit unde.
            </p1>

           </div>
           <div className='couter_wrapper d-flex align-items-center gap-5'>
                 <div className="counter_box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                 </div>
                 <div className="counter_box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                 </div>
                 <div className="counter_box">
                  <span>15</span>
                  <h6>Years Experience</h6>
                 </div>
           </div>
          </Col>
          <Col lg="6">
              <div className="experience_img">
                <img src={experience}></img>
              </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container className='mt-5'>
        <Row>
          <Col lg="12">
          <p3 className="sub2">Gallery</p3>
          <h2 className="gallery_title">
            Visit Our customers tour gallery
          </h2>

          </Col>
          <Col lg='12' >
            <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container className='mt-5'>
        <Row>
          <Col lg="12">
          <p4 className="sub2">Fans Love</p4>
          <h2 className="testimonial_title">What our fans say about us</h2>
          </Col>
          <Col lg="12">
             <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>
    <Newsletter/>
    </>
   
    
  )
}

export default Home
