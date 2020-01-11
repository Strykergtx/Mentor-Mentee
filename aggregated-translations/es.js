'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.locale = exports.areTranslationsLoaded = undefined;

var _reactIntl = require('react-intl');

var _es = require('react-intl/locale-data/es');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactIntl.addLocaleData)(_es2.default);

var messages = {
  "Terra.actionHeader.back": "Retroceder",
  "Terra.actionHeader.close": "Cerrar",
  "Terra.actionHeader.maximize": "Maximizar",
  "Terra.actionHeader.minimize": "Minimizar",
  "Terra.actionHeader.next": "Siguiente",
  "Terra.actionHeader.previous": "Anterior",
  "Terra.ajax.error": "Error al cargar el contenido.",
  "Terra.datePicker.dateFormat": "DD/MM/AAAA",
  "Terra.datePicker.openCalendar": "Abrir calendario",
  "Terra.datePicker.today": "Hoy",
  "Terra.form.field.optional": "(opcional)",
  "Terra.menu.back": "Retroceder",
  "Terra.menu.close": "Cerrar",
  "Terra.popup.header.close": "Cerrar",
  "Terra.searchField.search": "Buscar",
  "Terra.searchField.submit-search": "Enviar búsqueda",
  "Terra.tabs.more": "Más"
};
var areTranslationsLoaded = true;
var locale = 'es';
exports.areTranslationsLoaded = areTranslationsLoaded;
exports.locale = locale;
exports.messages = messages;
