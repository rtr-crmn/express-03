import AbstractDao from './AbstractDao';

class CustomerDao extends AbstractDao {
  constructor(unitOfWork) {
    super(unitOfWork);
  }
  
  async saveCustomer(customer) {
    const { code, customerId } = customer;
    
    const data = await this.command('INSERT INTO customer (code, customer_id) VALUES (?, ?)', [ code, customerId ]);
    
    customer.id = data.results.insertId;
  }
}

export default CustomerDao;
