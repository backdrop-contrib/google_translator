/**
 * @file
 * File init.js.
 */
(function (Backdrop) {
  Backdrop.behaviors.googleTranslatorElement = {
    vars: {
      displayMode: null,
      langcode: null,
      languages: null,
      id: null
    },

    attach: function (context, settings) {
      vars = {
        displayMode: settings.googleTranslatorElement.displayMode,
        id: settings.googleTranslatorElement.id,
        langcode: settings.googleTranslatorElement.langcode,
        languages: settings.googleTranslatorElement.languages
      }
    },

    init: function () {
      new google.translate.TranslateElement({
        pageLanguage: vars.langcode,
        includedLanguages: vars.languages,
        layout: google.translate.TranslateElement.InlineLayout[vars.displayMode]
      }, vars.id);
    },
  };
})(Backdrop);
