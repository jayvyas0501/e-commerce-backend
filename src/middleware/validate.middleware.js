const validate = (schema) => {
    return (req,res,next) => {
        const {error} = schema.validate(req.body, { abortEarly:false })
        
        if(error) {
            const error = error.details.map((err)=> err.message);
            return res.status(400).json({ success:false,error })
        }

        next();
    }
}

export default validate