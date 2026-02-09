const validateCartItem=(req,res,next)=>{
    const {productId,qty}=req.body;

    if (!productId){
        return res.status(400).json({message:"Product ID is required"});
    }
    if (!qty){
        return res.status(400).json({message:"Quantity is required"});
    }

    if (!(price || price <= 0)){
        return res.status(400).json({message:"Price is required and must be greater than 0"});
    }
    next();
}