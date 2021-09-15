function handleEmailUniqueError(err) {
  const errors = { path: "", message: "" };
  if (err.constraint === "customers_email_key") {
    errors.path = "email";
    errors.message = "email exist already";
  }
  return errors;
}

/**
 * This function checks for missing name or email and return an errror
 * @param {String} first_name the customer's first name
 * @param {String} last_name the customer's last name
 * @param {String} email the customer's email
 * @returns return an object of errors {path:"",error:""}
 */
function validateNameAndEmail(first_name, last_name, email) {
  const errors = { path: "", message: "" };
  if (!first_name) {
    errors.path = "first_name";
    errors.message = "What about your first name?";
  } else if (!last_name) {
    errors.path = "last_name";
    errors.message = "What about your last name?";
  } else if (!email) {
    errors.path = "email";
    errors.message = "What about your email?";
  }
  return errors;
}

/**
 *
 * @param {String} discount_type
 * @param {Number} discount_percentage
 * @returns Errors || ""
 */
function handleDiscountValidation(discount_type, discount_percentage) {
  const errors = { path: "", message: "" };
  if (!discount_type) {
    errors.path = "discount_type";
    errors.message = "A discount type is required to create a discount";
  } else if (!discount_percentage) {
    errors.path = "discount_percentage";
    errors.message = "A discount percent is required to create a discount";
  } else if (discount_percentage <= 0) {
    errors.path = "discount_percentage";
    errors.message = "A discount percent must be greater than zero";
  }
  return errors;
}

module.exports = {
  handleEmailUniqueError,
  validateNameAndEmail,
  handleDiscountValidation,
};
