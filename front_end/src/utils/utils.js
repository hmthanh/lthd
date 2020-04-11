export const required = (val) => val && val.length;
export const checkEmpty = val => {return val && val.length}
export const maxLength = (len) => (val) => !(val) || (val.length <= len);
export const minLength = (len) => (val) => val && (val.length >= len);
export const isNumber = (val) => !isNaN(Number(val));
export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export const requiredText = ' Trường bắt buộc';
export const validEmailText = ' Định dạng email không hợp lệ';
export const isNumberText = ' Trường yêu cầu định dạng số';
export const maxLengthText = (val) => `Tối đa: ${val} kí tự`;
export const minLengthText = (val) => `Tối thiểu: ${val} kí tự`;
export const convertObjectToArray = (object) => Object.keys(object).map(i => object[i]);
export const formatFormalDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('-');
};

export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};