const moment = require("moment");

/**
 * Calculates the entire discounts for the customer base on is_employee, is_affiliates etc
 * @param {Array} bill An array of the customer bill
 * @param {Object} rows An object of the customer identity
 * @returns totalBeforeDiscount, discountValue, customer
 */
function calTotal_Percentage(bill, rows) {
  const [customer] = rows;

  const currentDate = moment(new Date());
  const createdAt = moment(customer.created_at);
  const upToTwoYears = currentDate.diff(createdAt, "years");
  if (customer.is_affiliate) {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;
    let discountValue = 0;
    discountPercent = 10;
    bill.map((x) => {
      totalBeforeDiscount += x.product_price;
    });
    bill
      .filter((x) => {
        if (x.product_name === "groceries") return false;
        return true;
      })
      .map((x) => {
        discountValue += x.product_price;
      });
    const discount_type = "is_affiliate";
    discountValue *= discountPercent / 100;
    totalAfterDiscount = totalBeforeDiscount - discountValue;
    return {
      discount_type,
      totalAfterDiscount,
      totalBeforeDiscount,
      discountValue,
      customer,
      discountPercent,
    };
  } else if (customer.is_employee) {
    let totalBeforeDiscount = 0;
    let discountValue = 0;
    let totalAfterDiscount;
    let discount_type = "is_employee";
    const discountPercent = 30;

    bill.map((x) => {
      totalBeforeDiscount += x.product_price;
    });
    bill
      .filter((x) => {
        if (x.product_name === "groceries") return false;
        return true;
      })
      .map((x) => {
        discountValue += x.product_price;
      });

    discountValue *= discountPercent / 100;
    totalAfterDiscount = totalBeforeDiscount - discountValue;

    if (discountValue === 0) {
      discount_type = null;
    }
    return {
      discount_type,
      totalAfterDiscount,
      totalBeforeDiscount,
      discountValue,
      customer,
      discountPercent,
    };
  } else if (upToTwoYears >= 2) {
    let totalBeforeDiscount = 0;
    let discountValue = 0;
    let totalAfterDiscount = 0;
    let discount_type = "two_years";
    const discountPercent = 5;

    bill.map((x) => {
      totalBeforeDiscount += x.product_price;
    });
    bill
      .filter((x) => {
        if (x.product_name === "groceries") return false;
        return true;
      })
      .map((x) => {
        discountValue += x.product_price;
      });

    discountValue *= discountPercent / 100;
    totalAfterDiscount = totalBeforeDiscount - discountValue;

    return {
      discount_type,
      totalAfterDiscount,
      totalBeforeDiscount,
      discountValue,
      customer,
      discountPercent,
    };
  } else {
    let totalBeforeDiscount = 0;
    let discountValue = 0;
    let totalAfterDiscount;
    let discount_type = "over_$100";
    const discountPercent = 5;

    bill.map((x) => {
      totalBeforeDiscount += x.product_price;
    });
    bill
      .filter((x) => {
        if (x.product_price < 100) return false;
        return true;
      })
      .map((x) => {
        discountValue += Math.floor(x.product_price / 100);
      });

    discountValue *= discountPercent;
    totalAfterDiscount = totalBeforeDiscount - discountValue;

    if (discountValue === 0) {
      discount_type = null;
    }
    return {
      discount_type,
      totalAfterDiscount,
      totalBeforeDiscount,
      discountValue,
      customer,
      discountPercent,
    };
  }
}

module.exports = { calTotal_Percentage };
