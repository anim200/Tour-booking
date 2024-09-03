import Tour from "../models/Tour.js"

export const createTour = async (req,res) =>{
    const newTour= new Tour(req.body)
    try{
        const savedTour =await newTour.save();
        res.status(200).json({success:true,message:"Tour created successfully",data:savedTour})

    }catch(err){
        res.status(400).json({success:false,message:"Failed to create.Try again"})

    }

}
//update tour
export const updateTour = async (req,res)=>{
    const id=req.params.id;
    try {
        const updatedTour= await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({success:true,message:"successfully updated",data:updateTour})
        

    } catch (error) {
        res.status(500).json({success:false,message:"failed to update"})
        
    }
}
//delete tour
export const deleteTour = async (req,res)=>{
    const id=req.params.id;
   
        try {
            await Tour.findByIdAndDelete(id)
            res.status(200).json({success:true,message:"successfully deleted"})
            
    
        } catch (error) {
            res.status(500).json({success:false,message:"failed to delete"})
            
        }
    
}
//getSingle tour
export const getSingleTour = async (req,res)=>{
    const id=req.params.id;
   
    try {
       const tour= await Tour.findById(id).populate('reviews')
        res.status(200).json({success:true,message:"successfully fetched single tour",data:tour})
        

    } catch (error) {
        res.status(404).json({success:false,message:"not found"})
        
    }
}
//getAll tour
export const getAllTour = async (req,res)=>{
    const page = parseInt(req.query.page);

    try {
        const tour =await Tour.find({}).populate('reviews').skip(page*8).limit(8)
        res.status(200).json({success:true,count:tour.length,message:"successfully fetched all tours",data:tour})
        
    } catch (error) {
        res.status(404).json({success:false,message:"not found"})
        
    }
}

//get tour by search
export const getTourBySearch = async(req,res)=>{
    const city= new RegExp(req.query.city,'i')//here 'i'case sensitive
    const distance =parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    try{ 
        const tours = await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({success:true,message:"successfull",data:tours})
        

    }catch(err){
        res.status(404).json({success:false,message:"not found"})

    }
}

//getfeatured tour
export const getFeaturedTour = async (req,res)=>{
    
    try {
        const tour =await Tour.find({featured:true}).populate('reviews').limit(8);

        res.status(200).json({success:true,count:tour.length,message:"successfull",data:tour})
        
    } catch (error) {
        res.status(404).json({success:false,message:"not found"})
        
    }
}
//get tour counts
export const getTourCount = async(req,res) =>{
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({success:true,data:tourCount})
    } catch (error) {
        res.status(500).json({success:false,message:"failed to fetch"})
        
    }
}