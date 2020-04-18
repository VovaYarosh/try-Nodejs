const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp')

//@ desc    get all bootcamps
//@route    get /api/v1/bootcamps
//@access   public
exports.getBootcamps = asyncHandler(async (req,res,next) => {
        let query;

        //copt req.query
        const reqQuery = {...req.query};

        //fields to exclude
        const removeFields = ['select','sort', 'page', 'limit'];

        //loop  over removeFields and  delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        //create query string
        let queryStr = JSON.stringify(reqQuery);

        //create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //finding resources
        query = Bootcamp.find(JSON.parse(queryStr));

        //select fields
        if(req.query.select){
                const fields = req.query.select.split(',').join(' ');
                query = query.select(fields);
        }

        //sort
        if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
        }else{
                query = query.sort('-createdAt');
        }

        //pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const startIndex = (page - 1) * limit;
        const endIndex = page *limit;
        const total = await Bootcamp.countDocuments();

        query = query.startIndex(startIndex).limit(limit);

        //executing query
        const bootcamps = await query;

        //Pagination result
        const pagination =  {};

        if(endIndex < total){
                pagination.next = {
                        page: page + 1,
                        limit
                }
        }

        if(startIndex > 0){
                pagination.prev = {
                        page: page - 1,
                        limit
                }
        }

        res.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps})
    
}); 


//@ desc    get single bootcamp
//@route    get /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = asyncHandler(async (req,res,next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return  next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
                )
        }
        res.status(200).json({success: true,data: bootcamp})  
});


//@ desc    create new bootcamp
//@route    post /api/v1/bootcamps
//@access   private
exports.createtBootcamp = asyncHandler(async (req,res,next) => {
        const  bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        })   
}); 

//@ desc    update new bootcamp
//@route    put /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = asyncHandler(async(req,res,next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })   
        if(!bootcamp){
            return  next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
                )
        }   
        res.status(200).json({success: true, data: bootcamp})
}); 

//@ desc    delete new bootcamp
//@route    delete /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = asyncHandler(async(req,res,next) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
        if(!bootcamp){
            return  next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
                )
        }
    
        res.status(200).json({success: true, data: {}});
}); 

//@ desc    get bootcamps within a radius
//@route    get /api/v1/bootcamps/radius/:zipcode/:distance
//@access   private
exports.getBootcampsInRadius = asyncHandler(async(req,res,next) => {
        const {zipcode, distance} = req.params;

        //get lat/lng fron geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = log[0].longitude;

        //calc radius using radians
        //divide distance by radius of earthg
        //earth radius  = 3,963 mi 
        const radius = distance / 3963

        const bootcamps = await Bootcamp.find({
                location: {$geowithin: {$centerSphere:[[lng, lat], radius]}}
        })

        res.status(200).json({
                success: true,
                count: bootcamps.length,
                data: bootcamps
        })

}); 