const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined ) {
    error.message = 'name and budget are required';
  } else if ( name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'Account name must be between 3 and 100 characters';
  } else if ( typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
  } else if ( Math.sign(budget) !== 1 || budget > 1000000 ) {
    error.message = 'budget of account is too large or too small';
  }
  if ( error.message ) {
    next(error);
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const taken = await db('accounts')
    .where('name', req.body.name.trim())
    .first();
    if (taken) {
      next(
        { status: 400,
          message: 'That name is taken'  
      })
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if(!account) {
      next({ status: 404, message: 'account not found' })
    } else {
      req.account = account;
      next()
    }  
  } catch(err){
    next(err)
  }
}
