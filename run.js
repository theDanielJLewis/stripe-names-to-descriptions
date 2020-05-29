require('dotenv').config()
const argv = require('yargs')
  .options({
    'test-sk': {
      type: 'string',
      description: 'Test secret key, starting with "sk_"'
    },
    'live-sk': {
      type: 'string',
      description: 'Live secret key, starting with "sk_"'
    },
    'verbose': {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging.'
    },
    'dry-run': {
      alias: 'z',
      type: 'boolean',
      description: 'Run on test data. Requires --test-sk or the .env variable.'
    },
  })
  .argv

if (argv['dry-run']) {
    stripe = require('stripe')(argv['test-sk'] || process.env.STRIPE_TEST_SK);
} else {
    stripe = require('stripe')(argv['live-sk'] || process.env.STRIPE_LIVE_SK);
}

stripe.customers
  .list()
  .autoPagingEach( (customer) => {
      const name = customer.name;
      if (argv.v) console.log(name, "|", customer.description);
      if (customer.name && customer.description == null) {
          stripe.customers.update(customer.id, {
              description: name
          }, function(err, customer) {
            if (err) console.error(err);
          });
      };
  })
  .then(() => {
    console.log('Finished.');
  })
  .catch();
