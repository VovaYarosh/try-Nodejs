
//@ desc    get all bootcamps
//@route    get /api/v1/bootcamps
//@access   public
exports.getBootcamps = (req,res,next) => {
    res.status(200).json({success: true, msg:"show all bootcamps"});
} 


//@ desc    get single bootcamps
//@route    get /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg:`get bootcamp ${req.params.id}`});
} 

//@ desc    create new bootcamp
//@route    post /api/v1/bootcamps
//@access   private
exports.createtBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg:"create new bootcamp"});
} 

//@ desc    update new bootcamp
//@route    put /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg:`update bootcamp ${req.params.id}`});
} 

//@ desc    delete new bootcamp
//@route    delete /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = (req,res,next) => {
    res.status(200).json({success: true, msg:`delete bootcamp ${req.params.id}`});
} 