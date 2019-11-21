class Customer {
  constructor(data) {
    const { id, code, customerId } = data;

    this.id	= id;
    this.code	= code;
    this.customerId = customerId;
  }
}

export default Customer;
