const requestLogger = (request, response, next) => {
  console.info('Method:', request.method)
  console.info('Path:  ', request.path)
  console.info('Body:  ', request.body)
  console.info('---')
  next()
}
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    console.log('HITTING HERE')
    return response.status(401).json({
      error: 'invalid token',
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  // next(error)
}
const ErrorHandler = (err, req, res, next) => {
  console.log('Middleware Error Hadnling')
  const errStatus = err.statusCode || 500
  const errMsg = err.message || 'Something went wrong'
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
}

export { errorHandler, requestLogger, ErrorHandler }
