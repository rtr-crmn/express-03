class AbstractDao {
  constructor(connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  async getConnection() {
    if ( this.connection === undefined ) {
      const connection = this.connectionFactory.create();

      this.connection = await new Promise((resolve, reject) => {
        connection.connect(error => {
          error ? reject(error) : resolve(connection)
        });
      }) ;
    }

    return this.connection;
  }
  async query(query, values) {
    let value = null;
    const connection = await this.getConnection();
    try {
      value = connection.execute(query, values);
      console.log(value)
    } catch (error) {
      console.error(error)
    } finally {
      await connection.end();
    }
    return value;
  }
  
  async command(command, values) {
    let value = null;
    const connection = await this.getConnection();
    try {
      value = await new Promise((resolve, reject) => {
        connection.query(command, values, (error, results, fields) => { 
          error ? reject(error) : resolve({ results, fields })
        });
      });
    } catch (error) {
      console.error(value)
    } finally {
      await connection.end();
    }
    return value;
  }
}

export default AbstractDao;
