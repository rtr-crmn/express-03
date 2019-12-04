import AbstractDao from './AbstractDao';

class BookingDao extends AbstractDao {
  constructor(unitOfWork) {
    super(unitOfWork);
  }
  
  async saveBooking(booking) {
    const { code, customerId } = booking;
    
    const data = await this.command('INSERT INTO booking (code, customer_id) VALUES (?, ?)', [ code, customerId ]);
    
    booking.id = data.results.insertId;
  }
}

export default BookingDao;
