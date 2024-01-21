const errorMessages = (statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;
}

module.exports = errorMessages;