/**
 *
 * @param {Object} res The response object
 * @param {String} error This is the main issue for the error
 * @param {Number} errorCode Default is 500, 400 || 404 is allowed
 * @param {String} message Additional message, default is "An error occured"
 * @returns ok:false, err, errorCode message
 */
function handleError(
  res,
  error,
  errorCode = 500,
  message = "An error occured"
) {
  return res.status(errorCode).json({
    error,
    message,
  });
}

module.exports = {
  handleError,
};
