'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.locale = exports.areTranslationsLoaded = undefined;

var _reactIntl = require('react-intl');

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactIntl.addLocaleData)(_en2.default);

var messages = {"Terra.actionHeader.back": "Back",
"Terra.actionHeader.close": "Close",
"Terra.actionHeader.maximize": "Maximize",
"Terra.actionHeader.minimize": "Minimize",
"Terra.actionHeader.next": "Next",
"Terra.actionHeader.previous": "Previous",
"Terra.ajax.error": "This content failed to load.",
"Terra.datePicker.dateFormat": "MM/DD/YYYY",
"Terra.datePicker.openCalendar": "Open Calendar",
"Terra.datePicker.today": "Today",
"Terra.form.field.optional": "(optional)",
"Terra.menu.back": "Back",
"Terra.menu.close": "Close",
"Terra.popup.header.close": "Close",
"Terra.searchField.search": "Search",
"Terra.searchField.submit-search": "Submit Search",
"Terra.tabs.more": "More"};
var areTranslationsLoaded = true;
var locale = 'en';
exports.areTranslationsLoaded = areTranslationsLoaded;
exports.locale = locale;
exports.messages = messages;
