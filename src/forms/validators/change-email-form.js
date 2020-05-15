const { body } = require('express-validator');
const { processValidationResults } = require('./index');
const usersRepo = require('../../repositories/users');

module.exports = ({
  blacklist = [],
  failureRedirect,
  key,
  persistOnFailure = true,
}) => [
  body('newEmail')
    .isEmail()
    .withMessage('Please put in a valid Email Address')
    .custom(async (email) => {
      const user = await usersRepo.findUserByEmail({
        email,
        shouldThrow: false,
      });
      if (user) {
        return Promise.reject('User with such email already exists.');
      }
    }),
  processValidationResults({
    blacklist,
    failureRedirect,
    key,
    persistOnFailure,
  }),
];
