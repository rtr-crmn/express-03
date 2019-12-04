import { mySqlConnectionFactory } from './mysql/MySqlConnectionFactory';

import UnitOfWork from './UnitOfWork';

class UnitOfWorkFactory {
  constructor(connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  create() {
    const unitOfWork = new UnitOfWork(this.connectionFactory);
    
    return unitOfWork;
  }
}

export default UnitOfWorkFactory;

export const unitOfWorkFactory = new UnitOfWorkFactory(mySqlConnectionFactory);