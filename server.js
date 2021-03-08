const Express = require('express');
const bodyParser = require('body-parser');
const Product = require('./services/productServices.js');
const User = require('./services/userServices.js');

const app = Express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

// Products
app.get('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json();
  });
});

app.get('/products:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.getSKU({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.get('/products:name', async (request, response) => {
  const getResult = await Product.getName({ name: request.params.name }).select('-_id -__v');
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.get('/products:quantity', async (request, response) => {
  const getResult = await Product.getQuantity({ quantity: request.params.quantity }).select('-_id -__v');
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.get('/products:price', async (request, response) => {
  const getResult = await Product.getPrice({ price: request.params.price }).select('-_id -__v');
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.post('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await Product.postProducts(request.body);
    response.sendStatus(201);
  });
});

app.delete('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteMultiple(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteSKU({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:name', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteName({
      name: request.params.name,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:quantity', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteQuantity({
      quantity: request.params.quantity,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:price', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deletePrice({
      price: request.params.price,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/products/:sku', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await doActionThatMightFailValidation(request, response, async () => {
    await Product.putProduct({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
});

app.patch('/products/:sku', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Product
      .patchProducts({ sku }, product, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
});

// Users
app.get('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json();
  });
});

app.get('/users:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.getSSN({ ssn: request.params.ssn }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.get('/users:firstName', async (request, response) => {
  const getResult = await User.getFN({ firstName: request.params.firstName });
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.get('/users:lastName', async (request, response) => {
  const getResult = await User.getLN({ lastName: request.params.lastName });
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.get('/users:address', async (request, response) => {
  const getResult = await User.getAddress({ address: request.params.address });
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

app.post('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await User.postUsers(request.body);
    response.sendStatus(201);
  });
});

app.delete('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteMultiple(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteSSN({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:firstName', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteFN({
      firstName: request.params.firstName,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:lastName', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteLN({
      lastName: request.params.lastName,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:address', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteAddress({
      address: request.params.address,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/users/:phoneNumber', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deletePhone({
      phoneNumber: request.params.phoneNumber,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/users/:ssn', async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    await User.putUsers({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
});

app.patch('/users/:ssn', async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await User
      .patchUsers({ ssn }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
});
