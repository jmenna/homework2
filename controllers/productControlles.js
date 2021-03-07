const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('../models/product');

const app = express();
app.use(BodyParser.json());

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

app.get('/products', async (request, response) => {(request, response) {
  try {
    // We only pass the body object, never the req object
    const createdCord = await PostServiceInstance.create(request.body);
    return response.send(createdCord);
  } catch (err) {
    response.status(500).send(err);
  }
}

app.get('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json();
  });
});

app.get('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.get('/products/:name', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.findOne({ name: request.params.name }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.get('/products/:quantity', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.findOne({ quantity: request.params.quantity }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
});

app.get('/products/:price', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Product.findOne({ price: request.params.price }).select('-_id -__v');
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

(async () => {
  await Mongoose.connect('mongodb+srv://admin:admin@cluster0-cde82.mongodb.net/mongodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
