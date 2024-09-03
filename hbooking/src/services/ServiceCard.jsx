import './service-card.css'


const ServiceCard = ({item}) => {
  console.log(item)
  
  

  return (
    <div className='service_item'>
        <div className="service_img">
            <img src={item.imgUrl} alt=""/>
        </div>
        <h5>{item.title}</h5>
        <p>{item.desc}</p>
    </div>
  )
}

export default ServiceCard
