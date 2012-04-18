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
        if( typeof (Drupal.behaviors.google_translator_init.get_cookie('googtrans')) != 'undefined') {
          $('a.google-translator-switch').hide();
          $('#google_translator_element.google_translator').show();
        }

        $('a.google-translator-switch').click(function(event) {
          if($('#__dimScreen').length == 0) {
            acept = '<a href=javascript:void() class="accept-terms">' + settings.google_translator.acept_text + '</a>';
            cancel = '<a href=javascript:void() class="do-not-accept-terms">' + settings.google_translator.donnot_acept_text + '</a>';
            message = '<div class="message">' + settings.google_translator.disclaimer + '<div>' + acept + ' ' + cancel + '</div></div></div>';
            $('<div id="__dimScreen"><div class="overlay-wrapper"></div>').css({
              height : '100%',
              left : '0px',
              position : 'absolute',
              top : '0px',
              width : '100%',
              zIndex : '700'
            }).appendTo(document.body);

            //attach message text
            $('#__dimScreen .overlay-wrapper').after(message);

            //accepted terms
            $('#__dimScreen .message a.accept-terms').click(function(event) {
             // Drupal.behaviors.google_translator_init.set_cookie('serv-terms', 'yes')
              $('#__dimScreen').remove();
              $('#google_translator_element.google_translator').show();
              $('a.google-translator-switch').hide();

            });
            //did not accepted terms
            $('#__dimScreen .message a.do-not-accept-terms').click(function(event) {
              $('#__dimScreen').remove();
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
            }).fadeTo(100, 0.75, function(event) {
            });
          }
        });
      });
    }
  }
})(jQuery);
