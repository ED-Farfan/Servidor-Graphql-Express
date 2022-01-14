"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
console.log('testing');
app.get('/', function (req, res) {
  res.json({
    msg: "Hola"
  });
});
app.use('/graphql', (0, _expressGraphql.graphqlHTTP)({
  schema: _schema["default"],
  graphiql: true
}));
app.listen(3000, function () {
  return console.log("Servidor en puerto 3000");
});
//# sourceMappingURL=index.js.map