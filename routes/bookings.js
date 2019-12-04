import express from 'express';

import { unitOfWorkFactory } from '../data/UnitOfWorkFactory';
import BookingDao from '../data/BookingDao';
import CustomerDao from '../data/CustomerDao';

import Booking from '../models/Booking';
import Customer from '../models/Customer';

const router = express.Router();



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

  const unitOfWork = unitOfWorkFactory.create();

  const bookingDao = new BookingDao(unitOfWork);
  const customerDao = new CustomerDao(unitOfWork);

  console.log('unitOfWork start');

  await unitOfWork.start();

  try {

    const customer = new Customer(requestData);

    await customerDao.saveCustomer(customer);

    const booking = new Booking(requestData);
    booking.customerId = customer.id;

    await bookingDao.saveBooking(booking);

    console.log('unitOfWork complete start');

    await unitOfWork.complete();

    console.log('unitOfWork complete end');

    res.send(booking);

  } catch (error) {
    console.error(error);
    console.log('unitOfWork rollback start');

    await unitOfWork.rollback();

    console.log('unitOfWork rollback end');

    res.end();

  }
});

export default router;
