"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var typeDefs = "\ntype Query {\n    hello: String\n    greet(name: String):String\n    par(numero: Int!): Boolean\n    saludo(nombre: String):String\n    varios(num: Int!):Int    \n    ingredientes:[Ingredientes]\n    ingrediente(id: Int, nombre: String):Ingredientes\n    pizzas(id: Int,nombre: String):[Pizzas]\n  }\n  type Mutation{\n    createIngrediente(input: inputIngrediente): Ingredientes\n  }\n  input inputIngrediente{\n    nombre: String!\n  }\n  type Ingredientes{\n      id:ID\n      nombre: String\n  }\n  type Pizzas{\n    id:ID\n    nombre: String\n    precio: Float\n    ingredientes: [Ingredientes]\n}\n";

var _default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: _resolvers.resolvers
});

exports["default"] = _default;
//# sourceMappingURL=schema.js.map