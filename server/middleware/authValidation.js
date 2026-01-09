import joi from 'joi'

export const  registerValidater = async(req,res,next)=>{
    const schema = joi.object({
        firstName : joi.string().min(3).max(20).required(),
        lastName : joi.string().min(3).max(20).required(),
        email : joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
}


export const loginValidater = async(req,res,next)=>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
}

