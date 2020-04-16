const Bootcamp = require('../models/Bootcamp')

//@ desc    get all bootcamps
//@route    get /api/v1/bootcamps
//@access   public
exports.getBootcamps = async (req,res,next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({success: true,data: bootcamps})
    } catch (err) {
        res.status(400).json({ success: false});
    }
} 


//@ desc    get single bootcamp
//@route    get /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = async (req,res,next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true,data: bootcamp})
    } catch (err) {
        res.status(400).json({ success: false});
    }
}
} 

//@ desc    create new bootcamp
//@route    post /api/v1/bootcamps
//@access   private
exports.createtBootcamp = async (req,res,next) => {
    try {
        const  bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    })
    } catch (err) {
        res.status(400).json({success: false})
    }
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