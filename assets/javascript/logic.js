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

    navListener: () => {

      elements.nav.all.on("click", event => {

        let clicked = {
          self: $(event.currentTarget),
          target: $(event.currentTarget.firstChild).attr('data-target')
        };

        if (clicked.target !== state) {
          displaySwitch(clicked.target)
        }
      });
    }
  };
}

function displaySwitch(target) {
  // custom carousel animation for main site locations
  //

  function slide(dir, display, target, increment, duplicate) {

    let options = {
      effect: 'slide',
      easing: (i !== end && i !== start) ? 'linear': 'swing',
      direction: dir,
      duration: (i !== end && i !== start) ? (timing - 100): timing,
      complete: () => {
        if (!duplicate) {
          increment ? i++ : i--;
        }
        if (increment ? i > end: i < end) {
          return
        }
        animationLoop(increment, duplicate);
      }
    };

    if (display) {
      $(`#${target}`).show(options)
    }
    else {
      $(`#${target}`).hide(options)
    }
  }

  function animationLoop(forward, duplicate) {



    if (i === start) {

      slide(
        forward ? 'left' : 'right',
        false,
        pos[i.toString()],
        forward,
        duplicate
      )
    }

    else if ((forward ? i < end: i > end)) {

      console.log("it?");
      window.state = pos[i.toString()];
      decoration.iconUnderline();

      slide(
        forward ?
          (duplicate ? 'left': 'right'):
          (duplicate ? 'right': 'left'),
        !duplicate,
        pos[i.toString()],
        forward,
        !duplicate
      )
    }
    else if (i === end) {

      window.state = pos[i.toString()];
      decoration.iconUnderline();

      slide(
        !forward ? 'left' : 'right',
        true,
        pos[i.toString()],
        forward,
        duplicate
      )
    }
  }


  let screens = {
    about: 0,
    contact: 1,
    portfolio: 2
  };

  let pos = _.invert(screens);
  let timing = 150;
  let start = screens[window.state];
  let i = start;
  let end = screens[target];
  animationLoop((start < end), false)


  // $(window).scrollTop;
  // $(`#${state}`).hide({
  //   effect: 'slide',
  //   easing: 'swing',
  //   duration: 250,
  //   complete: () => {
  //     $(`#${target}`).show({
  //       effect: 'slide',
  //       direction: 'right',
  //       easing: 'swing',
  //       duration: 250,
  //       complete: () => {
  //         window.state = target
  //       }
  //     });
  //   }
  // });
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
                      listeners.navListener();
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
