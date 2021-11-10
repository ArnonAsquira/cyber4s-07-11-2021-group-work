

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error,req,res,next)=>{
    console.log('error: ', error);
    if(error === 'Not Found!') return res.status(404).send(error)
    return res.status(400).send(error.message);
}

module.exports= {unknownEndpoint, errorHandler};