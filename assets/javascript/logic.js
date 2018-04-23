function createCommon() {

  window.state = 'about';

  window.elements = {

    header: $('#head'),
    body: $(document.body),
    splash: $('.splash'),

    cards: {
      bio: $('#about-card')
    },

    nav: {
      all: $('.nav-icons'),
      about: $('#nav-about'),
      contact: $('#nav-contact'),
      portfolio: $('#nav-portfolio')
    },

    section: {
      all: $("section"),
      about: $("#about"),
      contact: $('#contact'),
      portfolio: $('#portfolio')
    }
  };

  window.decoration = {

    iconUnderline: () => {

      elements.nav.all.removeClass('i-underline');
      switch (window.state) {
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

  window.listeners = {

    headFiller: () => {

      let filler = $('.top-filler');
      filler.height(elements.header.height());
      $(window).on('resize', event => {
        filler.height(elements.header.height())
      })
    },

    splashResize: () => {

      function splashHelper() {
        elements.splash.css("max-height",
          elements.cards.bio.height() + 90
        )
      }

      splashHelper();
      $(window, 'section').on('resize', event => {
        splashHelper()
      })
    }
  };
}

function init() {

  function typeAnimation(one, two) {

    function type(first, last, count) {

      let target = $("#name");
      let time = 70;

      if (count < first.length + last.length + 1) {
        if (count < first.length) {
          target.append(first[count]);
          count++;
          setTimeout(() => {
            type(first, last, count);
          }, time)
        }
        else if (count === first.length) {
          target.append(' ');
          count++;
          setTimeout(() => {
            type(first, last, count);
          }, time * 3)
        }
        else {
          target.append(last[count - first.length - 1]);
          count++;
          setTimeout(() => {
            type(first, last, count);
          }, time)
        }
      }
    }

    let i = 0;
    type(one, two, i);
  }

  function introAnimation() {
    $(document.body).css('display', 'block');
    listeners.headFiller();
    $(".ic").fadeIn(600);
    elements.header.animate({
      height: 'toggle',
      duration: 200,
    }, () => {
      elements.cards.bio.animate({
        opacity: '0.99',
        duration: 300,
      });
    });
    elements.section.about.fadeIn(300);
    elements.cards.bio.animate({
      height: 'toggle',
      delay: 50,
      duration: 500,
    }, () => {
      // listeners.splashResize();
      setTimeout(() => {
        typeAnimation('Benjamin', 'Rose');
      }, 150)
    });
  }

  function ready() {
    createCommon();
    elements.cards.bio.animate({
      height: 'toggle',
      duration: 10,
    });
    elements.header.animate({
      height: 'toggle',
      duration: 10,
    }, () => {
      $(document).ready(() => {
        decoration.iconUnderline();
        introAnimation()
      });
    });
  }

  ready()
}


init();
