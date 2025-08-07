const { validationResult } = require("express-validator");



// Middleware de validation des champ, ce qui permet de vérifier et de controller le contenudes requete
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      msg: err.msg,
    }));
    return res.status(422).json({ errors: formattedErrors });
  }
  next();
};
