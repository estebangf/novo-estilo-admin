export function getDateValue(dateObject: Date) {
  let dateExtra = new Date(dateObject);
  // dateExtra.setMinutes(dateExtra.getMinutes() - dateExtra.getTimezoneOffset());

  let fullYear = dateExtra.getFullYear()
  let month = dateExtra.getMonth()+1
  let date = dateExtra.getDate()

  return `${fullYear}-${month < 10 ? "0"+month : month}-${date < 10 ? "0"+date : date}`
}