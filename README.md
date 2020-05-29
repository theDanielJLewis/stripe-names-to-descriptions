# Stripe Names to Descriptions
Fix Stripe records by copying the customer names to descriptions.

I made this script to fix an annoyance in Stripe payout descriptions. The problem was that my ecommerce software would save the customer's name, but then Stripe would display only the "description" (which defaults to the email address if the description is blank) in the details column on payout details pages. Thus, accounting was cumbersome.

So instead of manually cross-referencing email addresses or manually editing each customer, this script will go through ever customer your Stripe account who has a name but not a description and copy the name to the description.

## Setup

Either include the live/test secret key in the run command (see below), or create a `.env` file with one or both of the following variables and add the appropriate Stripe secret keys.

```
STRIPE_TEST_SK=
STRIPE_LIVE_SK=
```

## Usage

Run the script with `node run.js` to execute on your live data.

## Options

```
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --test-sk      Test secret key, starting with "sk_"                   [string]
  --live-sk      Live secret key, starting with "sk_"                   [string]
  --verbose, -v  Run with verbose logging.                             [boolean]
  --dry-run, -z  Run on test data. Requires --test-sk or the .env variable.
```