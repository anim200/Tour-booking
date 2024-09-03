import ServiceCard from "./ServiceCard";
import {Col} from 'reactstrap'
import weather from "../assets/images/weather.png"
import guide from "../assets/images/guide.png"
import customization from "../assets/images/customization.png"
const serviceData = [
    {
        imgUrl:weather,
        title:"Calculate Weather",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit"


    },
    {
        imgUrl:guide,
        title:"Best Tour Guide",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit"


    },
    {
        imgUrl:customization,
        title:"Customization",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit"


    },


]
   

const ServiceList = () => {
  return <>
  {
    serviceData.map((item,index)=>(
         
        <Col lg='3' md='6' sm='12' className="mb-4"key={index}><ServiceCard item={item}/></Col>
    )
    
    )
  }
  
  </>
}

export default ServiceList
