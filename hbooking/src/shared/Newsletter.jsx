
import './newsletter.css'
import { Container,Row,Col} from 'reactstrap'
import maletourist from "../assets/images/male-tourist.png"
const Newsletter = () => {

  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg='6'>
                   <div className='newsletter_content'>
                      <h2>Subscibe to get useful traveling information</h2>
                      <div className='newsletter_input'>
                          <input type='email' placeholder='Enter your email'></input>
                          <button className="btn newsletter_btn">Subscribe</button>
                      </div>
                        <p>lorem ipsum dolor sit amet consectetur adipiscing elite.obacaecati adipisci sunt in, provident facere ipsam? </p>
                   </div>

                </Col>
                <Col lg="6">
                   <div className="newsletter_img">
                      <img src={maletourist}></img>
                   </div>

                </Col>
            </Row>
        </Container>
    </section>
  )
 
}

export default Newsletter
