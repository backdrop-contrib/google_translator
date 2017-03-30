Google Translator
=================

INTRODUCTION
------------

This module brings the power of Google Website Translate into Drupal, providing
an instant translated version of your site's text.
Convert any menu link into a google translate switch, that, on click, will show
a dropdown with configured language. This way we keep a lean user interface for
those who do not need the translation option. Optionally you can add the 
translate switch as a block instead. Provides an administration interface to
allow users to activate languages, display modes and a disclaimer text.
https://translate.google.com/manager/website/?hl=en

* For a full description of the module, visit the project page:
  https://www.drupal.org/project/google_translator

* To submit bug reports and feature suggestions, or to track changes:
  https://www.drupal.org/project/issues/1473726


REQUIREMENTS
------------

* Libraries module
  https://www.drupal.org/project/libraries
* jQuery.DOMNodeAppear library
  - This version for jQuery 1.7+
    https://github.com/liamdanger/jQuery.DOMNodeAppear
  - This version for jQuery below 1.7
    https://github.com/jennatollerson/jQuery.DOMNodeAppear/tree/for-old-jquery


INSTALLATION
------------

* Place this module in your site's contrib modules folder as usual.
  For help with this step see: https://www.drupal.org/node/895232
  
* Download jQuery.DOMNodeAppear.
  See notes above to identify the version compatible with your site's version
  of jQuery.
  
* Locate your libraries directory. Usually:
  /sites/all/libraries/
  
* Place the files in a new jquery.domnodeappear directory in the site's
  libraries folder (/libraries), so the structure looks like:
  - libraries/
    - jquery.domnodeappear/
      - jquery.domnodeappear.js
      - README.md
  
* Enable Google Translator in your site's modules admin.

CONFIGURATION & USAGE
---------------------

* To configure, go to: /admin/config/system/google-translate

* To use in a menu:
  - Add a new link to any menu
  - Add any text to the title, i.e. Translate
  - Add this placeholder to the path: `<google-translate>`
  
* To use as a block, add the Google Translator language selector to any region.
