function createCommon() {

  window.state = 'about';

  window.elements = {

    header: $('#head'),
    body: $(document.body),
    splash: $('.splash'),

    boxes: {
      aboutRow: $('#about-row'),
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
    },

    modSpace: () => {

      elements.boxes.aboutRow.animate(
        {'background-position-x': "+=15.5px"},
        {
          duration: 500,
          easing: 'swing',
          done: () => {
            elements.boxes.aboutRow.animate(
              {'background-position-x': "-=15.5px"},
              {
                duration: 500,
                easing: 'swing',
                done: decoration.modSpace
              });
          }
        });
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
          elements.boxes.bio.height() + 90
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
    $(".ic").fadeIn(450);
    elements.header.animate(
      {height: 'toggle'},
      {
        duration: 150,
        easing: 'swing',
        done: () => {
          elements.boxes.bio.animate(
            {opacity: '0.99'},
            {
              duration: 200,
              easing: 'linear',
              done: () => {
                elements.section.about.fadeIn(10);
                elements.boxes.aboutRow.animate(
                  {
                    height: 'toggle'
                  },
                  {
                    duration: 500,
                    easing: 'swing',
                    queue: true,
                    done: () => {
                      // listeners.splashResize();
                      setTimeout(() => {
                        typeAnimation('Benjamin', 'Rose');
                      }, 150)
                    }
                  });
              }
            },
          );
        }
      });
  }

  function ready() {
    createCommon();
    elements.boxes.aboutRow.animate(
      {height: 'toggle'},
      {
        duration: 0,
        done: () => {
          elements.header.animate(
            {height: 'toggle'},
            {
              duration: 0,
              done: () => {
                $(document).ready(() => {
                  decoration.iconUnderline();
                  introAnimation()
                });
              }
            });
        }
      },
    );
  }

  ready()
}


init();
