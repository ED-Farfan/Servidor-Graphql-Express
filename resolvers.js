"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Pizzas_Registro = _fs["default"].readFileSync("src/public/Pizzas.json", "utf-8");

var Pizzas = JSON.parse(Pizzas_Registro); //Crear funciones

var json_ingredi = _fs["default"].readFileSync("src/public/ingredientes.json", "utf-8");

var _ingredientes = JSON.parse(json_ingredi);

var resolvers = {
  Query: {
    hello: function hello() {
      return "Hello";
    },
    greet: function greet(root, args) {
      console.log(args);
      return "Hola";
    },
    saludo: function saludo(root, args) {
      return "Hola ".concat(args.nombre);
    },
    par: function par(root, args) {
      console.log(args, root);

      if (root) {
        return root.numero % 2 == 0;
      } else {
        return args.numero % 2 == 0;
      }
    },
    varios: function varios(root, args) {
      for (var i = 0; i < args.num; i++) {
        console.log(i);
      }

      return this.par({
        numero: args.num
      }) ? true : false;
    },
    ingredientes: function ingredientes() {
      return _ingredientes;
    },
    ingrediente: function ingrediente(root, args) {
      var _ref = args ? args : root,
          nombre = _ref.nombre,
          id = _ref.id;

      if (id || nombre) {
        var dato = id ? _ingredientes.find(function (elemento) {
          return elemento.id == id;
        }) : _ingredientes.find(function (elemento) {
          return elemento.nombre == nombre;
        });
        return dato;
      } else {
        return null;
      }
    },
    pizzas: function pizzas(root, args) {
      if (!(args || root)) {
        var copia = Pizzas;
        var npizzas = [];
        copia.forEach(function (element) {
          var nuevaPizza = {
            id: element.id,
            nombre: element.nombre,
            precio: element.precio,
            ingredientes: []
          };
          element.id_ingredientes.forEach(function (ingre) {
            var dato = _ingredientes.find(function (elemento) {
              return elemento.id == ingre;
            });

            nuevaPizza.ingredientes.push(dato);
          });
          npizzas.push(nuevaPizza);
        });
        return npizzas;
      } else if (args || root) {
        var _ref2 = args ? args : root,
            id = _ref2.id;

        if (id) {
          var pizza = Pizzas.find(function (element) {
            return element.id == id;
          });
          var nuevaPizza = {
            id: pizza.id,
            nombre: pizza.nombre,
            precio: pizza.precio,
            ingredientes: []
          };
          pizza.id_ingredientes.forEach(function (ingre) {
            var dato = _ingredientes.find(function (elemento) {
              return elemento.id == ingre;
            });

            nuevaPizza.ingredientes.push(dato);
          });
          return [nuevaPizza];
        }
      }

      return null;
    }
  },
  Mutation: {
    createIngrediente: function createIngrediente(_, args) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var nombre, dato, nuevoIngrediente, ingredientes_json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!args) {
                  _context.next = 17;
                  break;
                }

                nombre = args.input.nombre;
                console.log(nombre);
                dato = _ingredientes.find(function (elemento) {
                  return elemento.nombre.toLowerCase() == nombre.toLowerCase();
                });

                if (!dato) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", null);

              case 8:
                nuevoIngrediente = {
                  id: _ingredientes.length,
                  nombre: nombre
                };

                _ingredientes.push(nuevoIngrediente);

                _context.next = 12;
                return JSON.stringify(_ingredientes, null, 2);

              case 12:
                ingredientes_json = _context.sent;

                _fs["default"].writeFileSync("src/public/ingredientes.json", ingredientes_json, "utf-8");

                return _context.abrupt("return", nuevoIngrediente);

              case 15:
                _context.next = 18;
                break;

              case 17:
                return _context.abrupt("return", null);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map