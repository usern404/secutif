const ErrorHandling = (error) => {
  console.log(error);
  switch (error.code) {
  case 'P2002':
    return {
      code: 'DUPLICATE',
      success: 0,
    };
  default:
    return {
      code: 'SERVER_ERROR',
      success: 0,
    };
  }
};

module.exports = { ErrorHandling };
