
import Masonry,{ResponsiveMasonry} from 'react-responsive-masonry'
import galleryImages from './galleryImages'
console.log(galleryImages);

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
        <Masonry gutter='1rem'>
            {
                galleryImages.map((item,index)=>(
                     
                    <img className='masonry_img' src={item} key={index} alt='' style={{'width':'100%', display:'block','borderRadius':'10px'}}></img>
                ))
            }


        </Masonry>

    </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery
