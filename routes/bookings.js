import express from 'express';

import { mySqlConnectionFactory } from '../data/mysql/MySqlConnectionFactory';
import BookingDao from '../data/BookingDao';
import CustomerDao from '../data/CustomerDao';

import Booking from '../models/Booking';
import Customer from '../models/Customer';

const router = express.Router();

const connectionFactory = mySqlConnectionFactory;

const bookingDao = new BookingDao(connectionFactory);
const customerDao = new CustomerDao(connectionFactory);

console.error('******* test')

router.get('/bookings/:bookingId', function(req, res, next) {
  /*
  const data = [];

  mySqlConnectionFactory({ }).then(connection => {
    const query = Math.random() > 0.5 ? 'SELECT * FROM test' : 'SELECT * FROM notexists';
    connection.query(query)
      .on('error', error => res.render('error', { title: 'Express', error }))
      .on('result', row => data.push({ id: row.id, value: row.value }))
      .on('end', () => res.render('index', { title: 'Express', data }));
  }).catch(error => console.error(error));
  */
});

router.post('/', async function(req, res, next) {
  
  const requestData = { code: 'test-01', customerId: 1000 };

  try {
    const customer = new Customer(requestData);

    await customerDao.saveCustomer(customer);

    const booking = new Booking(requestData);
    booking.customerId = customer.id;

    await bookingDao.saveBooking(booking);

    res.send(booking);
  } catch (error) {
    console.error(error);
  } finally {
    res.end();
  }
});

export default router;
