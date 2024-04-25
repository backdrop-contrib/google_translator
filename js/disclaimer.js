/**
 * @file
 * File google_translator.js.
 */

(function ($, Backdrop) {
  'use strict';

  Backdrop.behaviors.googleTranslatorDisclaimer = {

    getCookie: function (name) {
      // Check for Google translation cookies.
      var i, x, y, cookies = document.cookie.split(";");
      for (i = 0; i < cookies.length; i++) {
        x = cookies[i].substring(0, cookies[i].indexOf("="));
        y = cookies[i].substring(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
          return decodeURIComponent(y);
        }
      }
    },

    attach: function (context, settings) {
      var disclaimerLink;
      var config = settings.googleTranslatorDisclaimer || {},
      disclaimerLink = $(config.selector, context),
      swap = function () {
        disclaimerLink.replaceWith(config.element);

        // When the gadget has loaded, focus on it.
        var translateGadgetObserver = new MutationObserver((mutations, obs) => {
          var displayMode = settings.googleTranslatorElement.displayMode;
          if (displayMode == "SIMPLE") {
            var gadget = document.querySelector('.goog-te-gadget-simple a');
          } else {
            var gadget = document.getElementsByClassName('goog-te-combo')[0];
          }
          if (gadget) {
            // Focus on the link. I don't know why we need delay but something
            // keeps the focus from happening without it.
            window.setTimeout(() => gadget.focus(), 500);

            // Found the gadget, end the MutationObserver.
            obs.disconnect();
            return;
          }
        })

        // Start observing.
        translateGadgetObserver.observe(document, {
          childList: true,
          subtree: true
        });
      };

      // When the user has previously activated Google translate, the cookie
      // will be set and we can proceed straight to exposing the language
      // button without the disclaimer interstitial.
      if (config.addDisclaimer && disclaimerLink.length &&
        typeof this.getCookie('googtrans') != 'undefined') {
        swap();
      }
      else {
        // Listen for user click on the translate interstitial (disclaimer) link.
        disclaimerLink.on('click', function (event) {
          event.preventDefault();

          // Show the disclaimer text if available.
          if (config.disclaimerText &&
            config.disclaimerText.trim().length > 0) {

            var disclaimerModal = $('<div class="message">' + config.disclaimerText + '<div>').appendTo('body');
            Backdrop.dialog(disclaimerModal, {
              title: config.disclaimerTitle,
              classes: {
                'ui-dialog': 'google-translator-disclaimer-modal',
              },
              width: 'auto',
              buttons: [
                {
                  text: config.acceptText,
                  click: function () {
                    $(this).dialog('close');
                    swap();
                  }
                },
                {
                  text: config.dontAcceptText,
                  click: function () {
                    $(this).dialog('close');
                  }
                }
              ]
            }).showModal();
          }

          // If the disclaimer text is not available, then just show the gadget.
          else {
            swap();
          }
        });
      }
    }

  }
})(jQuery, Backdrop);
