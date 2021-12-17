const { number, string } = require('@hapi/joi');
const Joi = require('@hapi/joi')

//registerValidation
const registerValidation = data => {
    console.log(data);
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(2)
            .max(20)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        //phone: Joi.string().min(10).max(10).required(),
        // userType: string(),
    });
    return schema.validate(data,{ allowUnknown: true })
}
//loginValidation
const loginValidation = data => {
    const schema = Joi.object( {
        email: Joi.string()
            .min(6)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation