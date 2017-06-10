/**
 * @author Sven Koelpin
 */
const yup = require('yup');


const validate = async ({what, options, req, res, next, isPostBody}) => {
    const validator = yup.object().shape(options);

    try {
        const validated = await validator.validate(what, {stripUnknown: isPostBody, abortEarly: false});
        if (isPostBody) {
            req.body = validated;
        } else {
            req.params = validated;
        }
        next();
    } catch (e) {
        const errors = {};
        e.inner.forEach(error => errors[error.path] = error.errors[0]);
        res.send(400, errors);
    }
};

const validateQueryParams = options => (req, res, next) => {
    const paramsToValidate = req.params;
    validate({what: paramsToValidate, options, req, res, next, isPostBody: false});
};

const validatePostBody = options => (req, res, next) => {
    const bodyToValidate = req.body;
    validate({what: bodyToValidate, options, req, res, next, isPostBody: true});
};

module.exports = {validatePostBody, validateQueryParams};
