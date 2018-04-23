function createCommon() {

  window.state = 'about';

  window.elements = {
    nav: {
      all: $(".nav-icons"),
      about: $("#nav-about"),
      contact: $("#nav-contact"),
      portfolio: $("#nav-portfolio")
    }
  };

  window.decoration = {

    iconUnderline: () => {

      elements.nav.all.removeClass('i-underline');
      switch(window.state) {
        case 'about':
          elements.nav.about.parent().addClass('i-underline');
          break;
        case 'contact':
          elements.nav.contact.parent().addClass('i-underline');
          break;
        case 'portfolio':
          elements.nav.portfolio.parent().addClass('i-underline');
          break;
      }
    }
  };
}

$(document).ready(() => {
  $("body").fadeIn(500);
  createCommon();
  decoration.iconUnderline()
});

