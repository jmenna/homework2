const user = require('../models/user');

async create ( postToCreate ) {
    try {
      const result = await this.MongooseServiceInstance.create( postToCreate );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }
}