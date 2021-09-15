function checkIfPriceHasZero(bill) {
  //check if price has zero in it.

  let check_price = null;
  bill.forEach((x) => {
    if (x.product_price === 0) {
      check_price = true;
    }
  });
  return check_price;
}

module.exports = {
  checkIfPriceHasZero,
};
