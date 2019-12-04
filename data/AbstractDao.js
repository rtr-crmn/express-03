class AbstractDao {
  constructor(unitOfWork) {
    this.unitOfWork = unitOfWork;
  }

  async query(query, values) {
    const connection = this.unitOfWork.getConnection();

    const value = connection.execute(query, values);

    return value;
  }
  
  async command(command, values) {
    const connection = this.unitOfWork.getConnection();

    const value = await new Promise((resolve, reject) => {
      connection.query(command, values, (error, results, fields) => { 
        error ? reject(error) : resolve({ results, fields })
      });
    });

    return value;
  }
}

export default AbstractDao;
