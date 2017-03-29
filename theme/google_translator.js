(function($) {
  Drupal.behaviors.google_translator_init = {
    set_cookie : function(name, value, days) {
      var expiration_date = new Date();
      expiration_date.setDate(expiration_date.getDate() + days);
      var value = escape(value) + ((days == null) ? "; expires=0" : "; expires=" + expiration_date.toUTCString());
      document.cookie = name + "=" + value;
    },
    get_cookie : function(name) {
      //check for google translations cookies
      var i, x, y, cookies = document.cookie.split(";");
      out = "";
      for( i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if(x == name) {
          return unescape(y);
        }
      }
    },
    attach : function(context, settings) {
      $(document).ready(function(event) {
        //builds the jQuery selector for the configured link
        var menu_link_selector = $('li a.'+settings.google_translator.jquery_selector);
        if (typeof (Drupal.behaviors.google_translator_init.get_cookie('googtrans')) != 'undefined' ) {
          menu_link_selector.hide().after(settings.google_translator.gt_script);
        }

        menu_link_selector.click(function(event) {
          if (settings.google_translator.disclaimer.trim().length>0) {
            if($('#__dimScreen').length == 0) {
              acept = '<a href="#" class="accept-terms">' + settings.google_translator.acept_text + '</a>';
              cancel = '<a href="#" class="do-not-accept-terms">' + settings.google_translator.donnot_acept_text + '</a>';
              message = '<div class="message">' + settings.google_translator.disclaimer + '<div>' + acept + ' ' + cancel + '</div></div>';
              $('<div id="__dimScreen"><div class="overlay-wrapper"></div></div>').css({
                height : '100%',
                left : '0px',
                position : 'fixed',
                top : '0px',
                width : '100%',
                zIndex : '700'
              }).appendTo(document.body);

              $(document.body).css("background-color", '#ccc');

              //attach message text
              $('#__dimScreen .overlay-wrapper').after(message);

              // Focus on accept link when modal appears.
              $('#__dimScreen .message a.accept-terms').focus();

              //accepted terms
              $('#__dimScreen .message a.accept-terms').click(function(event) {
                $('#__dimScreen').remove();
                menu_link_selector.hide().after(settings.google_translator.gt_script);
                $('.goog-te-gadget').DOMNodeAppear(function() {
                  setTimeout(function() {
                    // Focus on the gadget.
                    $('a.goog-te-menu-value').focus();
                  },500);
                });
              });

              //attach esc key to cancel action terms action
              $(document).keyup(function(e) {
                if (e.keyCode == 27) {
                  $('#__dimScreen').remove();
                  menu_link_selector.focus();
                }
              });
              //Cancel, did not accepted terms
              $('#__dimScreen .message a.do-not-accept-terms').click(function(event) {
                $('#__dimScreen').remove();
                // Plant the focus back where we left it.
                menu_link_selector.focus();
              });

              $('#__dimScreen .overlay-wrapper').css({
                background : '#000',
                height : '100%',
                left : '0px',
                opacity : '0',
                position : 'absolute',
                top : '0px',
                width : '100%',
                zIndex : '760'
              }).fadeTo(100, 0.75, function(event) { });
            }
          }// we have a disclaimer
          else {
            menu_link_selector.after(settings.google_translator.gt_script);
            menu_link_selector.hide();
          }
        });
      });
    }
  }
})(jQuery);
