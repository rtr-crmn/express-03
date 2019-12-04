class UnitOfWork {
  constructor(connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  getConnection() {
    if ( this.connection === undefined ) 
      throw new Error();

    return this.connection;
  }

  async createConnection() {
    const mysqlConnection = this.connectionFactory.create();

    const connection = await new Promise((resolve, reject) => {
      mysqlConnection.connect(error => {
        error ? reject(error) : resolve(mysqlConnection)
      });
    }) ;

    return connection;
  }

  async start() {
    if ( this.connection !== undefined )
      throw new Error();

    this.connection = await this.createConnection();

    await this.connection.beginTransaction();
  }
  
  async complete() {
    if ( this.connection === undefined )
      throw new Error();

    await this.connection.commit();
    await this.connection.end();
  }

  async rollback() {
    if ( this.connection === undefined )
      throw new Error();

    await this.connection.rollback();
    await this.connection.end();
  }
}

export default UnitOfWork;
