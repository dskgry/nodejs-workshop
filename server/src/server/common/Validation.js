/**
 * @author Sven Koelpin
 */
const yup = require('yup');

const validate = async ({shape, what, req, res, next}) => {
    try {
        const toValidate = req[what];
        const validated = await yup.object().shape(shape).validate(toValidate, {stripUnknown: true, abortEarly: false});

        Object.assign(req, {
            [what]: validated,
            [`orig${what}`]: toValidate,
        });

        next();
    } catch (validationErrors) {
        const allErrors = validationErrors.inner.reduce((errors, currentValidation) => Object.assign(errors, {
            [currentValidation.path]: currentValidation.errors[0], //first error is enough for this demo
        }), {});
        res.send(400, allErrors);
    }
};


const validateQueryParams = shape => (req, res, next) => {
    validate({what: 'query', shape, req, res, next});
};

const validatePostBody = shape => (req, res, next) => {
    validate({what: 'body', shape, req, res, next});
};

module.exports = {validatePostBody, validateQueryParams};
