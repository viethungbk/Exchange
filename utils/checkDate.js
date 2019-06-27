const checkValidDate = (dateString) => {
  if (dateString === undefined || dateString === null || dateString === '') {
    return false;
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
}

const checkPeriod = (startTimeString, endTimeString) => {
  if (!checkValidDate(startTimeString)) {
    return false;
  }

  if (!checkValidDate(endTimeString)) {
    return false;
  }

  const startTime = new Date(startTimeString);
  const endTime = new Date(endTimeString);

  if (endTime - startTime < 0) {
    return false;
  }

  return true;
}

module.exports = {
  checkValidDate,
  checkPeriod
};