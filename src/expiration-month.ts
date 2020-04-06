import type { ExpirationMonthVerification } from "./types";

function verification(
  isValid,
  isPotentiallyValid,
  isValidForThisYear?
): ExpirationMonthVerification {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isValidForThisYear: isValidForThisYear || false,
  };
}

function expirationMonth(value): ExpirationMonthVerification {
  const currentMonth = new Date().getMonth() + 1;

  if (typeof value !== "string") {
    return verification(false, false);
  }
  if (value.replace(/\s/g, "") === "" || value === "0") {
    return verification(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification(false, false);
  }

  const month = parseInt(value, 10);

  if (isNaN(Number(value))) {
    return verification(false, false);
  }

  const result = month > 0 && month < 13;

  return verification(result, result, result && month >= currentMonth);
}

export default expirationMonth;
