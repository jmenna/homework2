// const mongoose = require('mongoose');
const Express = require('express');
const bodyParser = require('body-parser');
const Product = require('./services/databaseServices.js');

const app = Express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/products', async (request, response) => {
  await Product.getAll(request, response);
});

app.get('/products/:sku', async (request, response) => {
  const getResult = await Product.getOne({ sku: request.params.sku });
  if (getResult != null) {
    response.json(getResult);
  } else {
    response.sendStatus(404);
  }
});

/* const doActionThatMightFailValidation = async (request, response, action) => {
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

app.get('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.getOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.post('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new Product(request.body).save();
    response.sendStatus(201);
  });
});

app.delete('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Product.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/products/:sku', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await doActionThatMightFailValidation(request, response, async () => {
    await Product.findOneAndReplace({ sku }, product, {
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
      .findOneAndUpdate({ sku }, product, {
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
app.get('/user', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json();
  });
});

app.get('/user/:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.post('/user', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
});

app.delete('/user', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
});

app.delete('/user/:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
});

app.put('/user/:ssn', async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await doActionThatMightFailValidation(request, response, async () => {
    await User.findOneAndReplace({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
});

app.patch('/user/:ssn', async (request, response) => {
  const { sku } = request.params;
  const user = request.body;
  delete user.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await User
      .findOneAndUpdate({ sku }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
}); */

/* (async () => {
  await mongoose.connect('mongodb+srv://admin:U7CWgya36gFJg57@cluster0.vnnkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})(); */

app.listen(8080, () => {
  console.log('Server is running on port 8080.');
});
