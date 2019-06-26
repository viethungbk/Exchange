const express = require('express');

const Exchange = require('../../models/Exchange');
const checkDate = require('../../utils/checkDate');

const router = express.Router();

// @route   GET api/exchange/date
// @desc    Get all exchanges by date
// @access  Public
router.get('/date', (req, res) => {
  const dateString = req.body.date;

  if (!checkDate.checkValidDate(dateString)) {
    return res.status(400).json('Invalid Date');
  }

  // Lấy dữ liệu mới nhất từ DB
  Exchange.findOne({ date: dateString })
    .sort({ _id: -1 })
    .exec((error, data) => {
      if (error) {
        console.log('Can not get data: ', error.message);
        reject(error);
      }

      if (data === null) {
        return res.status(404).json('Not Found !');
      }

      return res.status(200).json(data);
    });
})

// @route   GET api/exchange/history
// @desc    Get exchanges history
// @access  Public
router.get('/history', (req, res) => {
  const startDateString = req.body.startDate;
  const endDateString = req.body.endDate;

  if (!checkDate.checkPeriod(startDateString, endDateString)) {
    return res.status(400).json('Invalid Date');
  }

  const endDate = new Date(endDateString);
  let exchangePromises = [];

  for (let d = new Date(startDateString); d <= endDate; d.setDate(d.getDate() + 1)) {
    console.log(d)
    const date = d.toISOString().slice(0, 10);
    console.log(date);

    exchangePromises.push(
      Exchange.findOne({ date: date })
        .sort({ _id: -1 })
        .exec()
    );
  }

  Promise.all(exchangePromises)
    .then(rates => {
      console.log(rates);
      return res.status(200).json(rates);
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json('Fail to get exchange');
    });
})

module.exports = router;