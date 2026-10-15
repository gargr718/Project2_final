// ==================================
// SIGN IMAGE FILES
// ==================================

const signFiles = {
  'one-way': '../sign_vector/sign1.png',
  'stop': '../sign_vector/sign2.png',
  'enter': '../sign_vector/sign3.png',
  'caution': '../sign_vector/sign4.png',
  'notice': '../sign_vector/sign5.png',
  'do-not-enter': '../sign_vector/sign6.png',
  'exit': '../sign_vector/sign7.png',
  'wait': '../sign_vector/sign8.png',
  'walk': '../sign_vector/sign9.png',
  'keep-left': '../sign_vector/sign10.png',
  'pull': '../sign_vector/sign11.png',
  'push': '../sign_vector/sign12.png'
};


// ==================================
// ROUTES
// ==================================

const routes = {

  route1: [
    'stop',
    'push',
    'keep-left',
    'pull'
  ],

  route2: [
    'wait',
    'walk',
    'one-way',
    'do-not-enter'
  ],

  route3: [
    'enter',
    'notice',
    'caution',
    'exit'
  ]

};


// ==================================
// STARTING SIGN
// ==================================

const params =
  new URLSearchParams(
    window.location.search
  );


const startingSign =
  params.get('sign') ||
  'stop';


let activeRoute =
  Object.values(
    routes
  ).find(
    (route) =>
      route.includes(
        startingSign
      )
  );


if (!activeRoute) {
  activeRoute =
    routes.route1;
}


let currentIndex =
  activeRoute.indexOf(
    startingSign
  );


if (currentIndex < 0) {
  currentIndex = 0;
}


// ==================================
// ELEMENTS
// ==================================

const stage =
  document.getElementById(
    'interactionStage'
  );


const shell =
  document.getElementById(
    'commandShell'
  );


const image =
  document.getElementById(
    'commandImage'
  );


const instruction =
  document.getElementById(
    'instruction'
  );


const subInstruction =
  document.getElementById(
    'subInstruction'
  );


const timer =
  document.getElementById(
    'timer'
  );


const feedback =
  document.getElementById(
    'feedback'
  );


const actionButton =
  document.getElementById(
    'actionButton'
  );


// ==================================
// RESET
// ==================================

function resetStage() {

  shell.className =
    'command-shell';


  image.className =
    'command-image';


  image.onclick =
    null;

  image.onload =
    null;

  image.onpointerdown =
    null;

  image.onpointermove =
    null;

  image.onpointerup =
    null;

  image.onpointercancel =
    null;


  image.style.pointerEvents =
    '';

  image.style.cursor =
    '';

  image.style.position =
    '';

  image.style.zIndex =
    '';

  image.style.opacity =
    '';

  image.style.transform =
    '';

  image.style.display =
    '';

  image.style.transition =
    '';

  image.style.touchAction =
    '';

  image.style.userSelect =
    '';


  instruction.className =
    'instruction';

  instruction.style.marginTop =
    '';

  instruction.style.left =
    '';

  instruction.style.position =
    '';


  subInstruction.className =
    'sub-instruction';

  subInstruction.style.left =
    '';

  subInstruction.style.position =
    '';


  actionButton.onclick =
    null;

  actionButton.hidden =
    true;

  actionButton.style.opacity =
    '';

  actionButton.style.transform =
    '';

  actionButton.style.left =
    '';

  actionButton.style.position =
    '';


  timer.innerHTML =
    '';


  instruction.textContent =
    '';

  subInstruction.textContent =
    '';


  feedback.classList.remove(
    'show'
  );

  feedback.classList.remove(
    'click-feedback'
  );


  feedback.style.left =
    '';

  feedback.style.top =
    '';

  feedback.style.right =
    '';

  feedback.style.bottom =
    '';
}


// ==================================
// MOVE COPY UNDER DRAGGED SIGN
// ==================================

function moveCopyToX(x) {

  instruction.style.position =
    'relative';

  subInstruction.style.position =
    'relative';

  actionButton.style.position =
    'relative';


  instruction.style.left =
    `${x}px`;

  subInstruction.style.left =
    `${x}px`;

  actionButton.style.left =
    `${x}px`;
}


// ==================================
// FEEDBACK
// ==================================

function showFeedback(
  message,
  x = null,
  y = null
) {

  feedback.textContent =
    message;


  if (
    x !== null &&
    y !== null
  ) {

    feedback.classList.add(
      'click-feedback'
    );


    feedback.style.left =
      `${x}px`;

    feedback.style.top =
      `${y}px`;

    feedback.style.right =
      'auto';

    feedback.style.bottom =
      'auto';

  }

  else {

    feedback.classList.remove(
      'click-feedback'
    );


    feedback.style.left =
      '';

    feedback.style.top =
      '';

    feedback.style.right =
      '';

    feedback.style.bottom =
      '';
  }


  feedback.classList.add(
    'show'
  );


  clearTimeout(
    showFeedback.timeout
  );


  showFeedback.timeout =
    setTimeout(() => {

      feedback.classList.remove(
        'show'
      );

    }, 1700);
}


// ==================================
// SMOOTH BUTTON REVEAL
// ==================================

function smoothButtonIn() {

  actionButton.style.opacity =
    '0';

  actionButton.style.transform =
    'translateY(8px)';


  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      actionButton.style.opacity =
        '1';

      actionButton.style.transform =
        'translateY(0)';

    });

  });
}


// ==================================
// NEXT STEP
// ==================================

function nextStep() {

  currentIndex++;


  if (
    currentIndex >=
    activeRoute.length
  ) {

    if (
      activeRoute ===
      routes.route2
    ) {

      showRoute2Final();

    }

    else if (
      activeRoute ===
      routes.route3
    ) {

      showRoute3Final();

    }

    else {

      showFinal();
    }


    return;
  }


  renderStep(
    activeRoute[
      currentIndex
    ]
  );
}


// ==================================
// RENDER STEP
// ==================================

function renderStep(sign) {

  resetStage();


  image.src =
    signFiles[sign];

  image.alt =
    sign;


  if (
    sign === 'stop'
  ) {

    renderStop();

  }

  else if (
    sign === 'push'
  ) {

    renderPush();

  }

  else if (
    sign === 'keep-left'
  ) {

    renderKeepLeft();

  }

  else if (
    sign === 'pull'
  ) {

    renderPull();

  }

  else if (
    sign === 'wait'
  ) {

    renderWait();

  }

  else if (
    sign === 'walk'
  ) {

    renderWalk();

  }

  else if (
    sign === 'one-way'
  ) {

    renderOneWay();

  }

  else if (
    sign === 'do-not-enter'
  ) {

    renderDoNotEnter();

  }

  else if (
    sign === 'enter'
  ) {

    renderEnter();

  }

  else if (
    sign === 'notice'
  ) {

    renderNotice();

  }

  else if (
    sign === 'caution'
  ) {

    renderCaution();

  }

  else if (
    sign === 'exit'
  ) {

    renderExit();
  }
}


// ==================================
// STOP — 5 SECONDS
// ==================================

function renderStop() {

  instruction.textContent =
    'YOU MAY PROCEED SHORTLY';


  subInstruction.textContent =
    'Hold on. You’re not going anywhere yet.';


  timer.textContent =
    '';


  actionButton.hidden =
    true;


  function illegalClick(
    event
  ) {

    if (
      event.target.closest(
        '.top-nav'
      )
    ) {
      return;
    }


    if (
      event.target.closest(
        '.action-button'
      )
    ) {
      return;
    }


    shell.classList.remove(
      'error-buzz'
    );


    void shell.offsetWidth;


    shell.classList.add(
      'error-buzz'
    );


    showFeedback(
      'Already? You were told to stop.'
    );


    if (
      navigator.vibrate
    ) {

      navigator.vibrate(
        100
      );
    }
  }


  document.addEventListener(
    'click',
    illegalClick
  );


  setTimeout(() => {

    let seconds =
      5;


    timer.textContent =
      seconds;


    const countdown =
      setInterval(() => {

        seconds--;


        if (
          seconds > 0
        ) {

          timer.textContent =
            seconds;

        }

        else {

          clearInterval(
            countdown
          );


          timer.textContent =
            '';


          document.removeEventListener(
            'click',
            illegalClick
          );


          instruction.classList.add(
            'text-fade'
          );


          subInstruction.classList.add(
            'text-fade'
          );


          setTimeout(() => {

            instruction.textContent =
              'YOU MAY NOW PROCEED';


            subInstruction.textContent =
              'There you go. Permission granted.';


            instruction.classList.remove(
              'text-fade'
            );


            subInstruction.classList.remove(
              'text-fade'
            );

          }, 500);


          setTimeout(() => {

            actionButton.hidden =
              false;


            actionButton.textContent =
              'PROCEED';


            smoothButtonIn();


            actionButton.onclick =
              () => {

                nextStep();
              };

          }, 1650);
        }

      }, 1000);

  }, 900);
}


// ==================================
// PUSH
// ==================================

function renderPush() {

  instruction.textContent =
    'GO AHEAD.';


  subInstruction.textContent =
    'Push that fear away. Or anything else you’re ready to let go of.';


  image.classList.add(
    'can-interact'
  );


  image.onclick =
    () => {

      image.onclick =
        null;


      image.classList.remove(
        'can-interact'
      );


      image.classList.add(
        'pushed-away'
      );


      instruction.classList.add(
        'text-fade'
      );


      subInstruction.classList.add(
        'text-fade'
      );


      setTimeout(() => {

        instruction.textContent =
          'WELL.';


        subInstruction.textContent =
          'That was a little aggressive.';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 500);


      setTimeout(() => {

        actionButton.hidden =
          false;


        actionButton.textContent =
          'KEEP GOING';


        smoothButtonIn();


        actionButton.onclick =
          () => {

            nextStep();
          };

      }, 1650);
    };
}


// ==================================
// KEEP LEFT — DRAG
// ==================================

function renderKeepLeft() {

  shell.classList.add(
    'keep-left-drag-step'
  );


  instruction.textContent =
    'KEEP LEFT.';


  subInstruction.textContent =
    'Go on. Move it yourself.';


  actionButton.hidden =
    true;


  image.style.pointerEvents =
    'auto';

  image.style.cursor =
    'grab';

  image.style.touchAction =
    'none';

  image.style.userSelect =
    'none';

  image.style.position =
    'relative';

  image.style.zIndex =
    '20';

  image.style.transition =
    'none';


  let dragging =
    false;

  let completed =
    false;

  let startPointerX =
    0;

  let startTranslateX =
    0;

  let currentX =
    0;


  function getLeftLimit() {

    const imageWidth =
      image.offsetWidth ||
      260;


    return -Math.max(
      220,
      (
        window.innerWidth / 2
      ) -
      (
        imageWidth / 2
      ) -
      35
    );
  }


  image.onpointerdown =
    function(event) {

      if (completed) {
        return;
      }


      event.preventDefault();


      dragging =
        true;


      startPointerX =
        event.clientX;


      startTranslateX =
        currentX;


      image.style.cursor =
        'grabbing';


      image.setPointerCapture(
        event.pointerId
      );
    };


  image.onpointermove =
    function(event) {

      if (
        !dragging ||
        completed
      ) {
        return;
      }


      const difference =
        event.clientX -
        startPointerX;


      currentX =
        startTranslateX +
        difference;


      const leftLimit =
        getLeftLimit();


      currentX =
        Math.max(
          leftLimit,
          Math.min(
            0,
            currentX
          )
        );


      image.style.transform =
        `translate3d(${currentX}px, 0, 0)`;
    };


  image.onpointerup =
    function(event) {

      if (!dragging) {
        return;
      }


      dragging =
        false;


      image.style.cursor =
        'grab';


      if (
        image.hasPointerCapture(
          event.pointerId
        )
      ) {

        image.releasePointerCapture(
          event.pointerId
        );
      }


      const leftLimit =
        getLeftLimit();


      if (
        currentX <=
        leftLimit + 30
      ) {

        completeKeepLeft();

        return;
      }


      moveCopyToX(
        currentX
      );


      instruction.classList.add(
        'text-fade'
      );


      subInstruction.classList.add(
        'text-fade'
      );


      setTimeout(() => {

        instruction.textContent =
          'NOT QUITE THERE.';


        subInstruction.textContent =
          'Move it further.';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 500);
    };


  image.onpointercancel =
    image.onpointerup;


  function completeKeepLeft() {

    if (completed) {
      return;
    }


    completed =
      true;

    dragging =
      false;


    const leftLimit =
      getLeftLimit();


    currentX =
      leftLimit;


    image.style.pointerEvents =
      'none';


    image.style.cursor =
      'default';


    image.style.transition =
      'transform 0.55s cubic-bezier(.22,.61,.36,1)';


    image.style.transform =
      `translate3d(${leftLimit}px, 0, 0)`;


    moveCopyToX(
      leftLimit
    );


    setTimeout(() => {

      instruction.classList.add(
        'text-fade'
      );


      subInstruction.classList.add(
        'text-fade'
      );

    }, 300);


    setTimeout(() => {

      instruction.textContent =
        'LEFT ENOUGH?';


      subInstruction.textContent =
        'Don’t get used to it.';


      instruction.classList.remove(
        'text-fade'
      );


      subInstruction.classList.remove(
        'text-fade'
      );

    }, 850);


    setTimeout(() => {

      actionButton.hidden =
        false;


      actionButton.textContent =
        'WHAT NOW?';


      smoothButtonIn();


      actionButton.onclick =
        () => {

          nextStep();
        };

    }, 2150);
  }
}


// ==================================
// PULL
// ==================================

// ==================================
// PULL
// ==================================

function renderPull() {

  shell.classList.add(
    'pull-position'
  );


  image.classList.add(
    'pull-small'
  );


  image.classList.add(
    'can-interact'
  );


  // ==================================
  // STANDALONE PULL
  // ==================================

  if (
    startingSign ===
    'pull'
  ) {

    instruction.textContent =
      'PULL.';


    subInstruction.textContent =
      'You came here for something. Go on, pull it closer.';


    image.onclick =
      () => {

        image.onclick =
          null;


        image.classList.remove(
          'pull-small'
        );


        image.classList.remove(
          'can-interact'
        );


        /*
           IMAGE GROWS FIRST
        */

        image.classList.add(
          'pulled-in'
        );


        /*
           SHORT PAUSE
           AFTER IMAGE BECOMES BIG
        */

        setTimeout(() => {

          instruction.classList.add(
            'text-fade'
          );


          subInstruction.classList.add(
            'text-fade'
          );

        }, 650);


        /*
           THEN THE RESPONSE
           FADES IN
        */

        setTimeout(() => {

          instruction.textContent =
            '';


          subInstruction.textContent =
            'You really do follow instructions.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 1150);


        /*
           BUTTON COMES AFTER
           THE RESPONSE HAS SAT
           FOR A MOMENT
        */

        setTimeout(() => {

          actionButton.hidden =
            false;


          actionButton.textContent =
            'SEE WHERE THAT GOT YOU';


          smoothButtonIn();


          actionButton.onclick =
            () => {

              showFinal();
            };

        }, 2400);
      };


    return;
  }


  // ==================================
  // PULL INSIDE ROUTE 1
  // ==================================

  instruction.textContent =
    'PULL';


  subInstruction.textContent =
    'Changed your mind already? Fine, bring it back.';


  image.onclick =
    () => {

      image.onclick =
        null;


      image.classList.remove(
        'pull-small'
      );


      image.classList.remove(
        'can-interact'
      );


      /*
         IMAGE GROWS FIRST
      */

      image.classList.add(
        'pulled-in'
      );


      /*
         SHORT PAUSE
         AFTER IMAGE BECOMES BIG
      */

      setTimeout(() => {

        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );

      }, 650);


      /*
         THEN THE RESPONSE
         FADES IN
      */

      setTimeout(() => {

        instruction.textContent =
          '';


        subInstruction.textContent =
          'You really do follow instructions.';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 1150);


      /*
         BUTTON COMES AFTER
         THE RESPONSE HAS SAT
         FOR A MOMENT
      */

      setTimeout(() => {

        actionButton.hidden =
          false;


        actionButton.textContent =
          'SEE WHAT THAT GOT YOU';


        smoothButtonIn();


        actionButton.onclick =
          () => {

            showFinal();
          };

      }, 2400);
    };
}

// ==================================
// WAIT — 10 SECONDS
// ==================================

function renderWait() {

  shell.classList.add(
    'route2-step',
    'wait-position'
  );


  instruction.textContent =
    'NOT SO FAST.';


  subInstruction.textContent =
    'You’ve got somewhere to be? Too bad. You have to wait.';


  actionButton.hidden =
    true;


  timer.innerHTML = `
    <div class="wait-clock">
      <div class="wait-clock-hand"></div>
      <div class="wait-number">10</div>
    </div>
  `;


  const waitClock =
    timer.querySelector(
      '.wait-clock'
    );


  const waitNumber =
    timer.querySelector(
      '.wait-number'
    );


  let seconds =
    10;


  waitClock.classList.add(
    'clock-paused'
  );


  function impatientClick(
    event
  ) {

    if (
      event.target.closest(
        '.top-nav'
      )
    ) {
      return;
    }


    shell.classList.remove(
      'error-buzz'
    );


    void shell.offsetWidth;


    shell.classList.add(
      'error-buzz'
    );


    showFeedback(
      'Already getting impatient? We just started.',
      event.clientX,
      event.clientY
    );
  }


  document.addEventListener(
    'click',
    impatientClick
  );


  setTimeout(() => {

    waitClock.classList.remove(
      'clock-paused'
    );


    const countdown =
      setInterval(() => {

        seconds--;


        if (
          seconds > 0
        ) {

          waitNumber.textContent =
            seconds;

        }

        else {

          clearInterval(
            countdown
          );


          document.removeEventListener(
            'click',
            impatientClick
          );


          timer.innerHTML =
            '';


          instruction.classList.add(
            'text-fade'
          );


          subInstruction.classList.add(
            'text-fade'
          );


          setTimeout(() => {

            instruction.textContent =
              'FINALLY.';


            subInstruction.textContent =
              '';


            instruction.classList.remove(
              'text-fade'
            );

          }, 500);


          setTimeout(() => {

            subInstruction.textContent =
              'You can now proceed.';


            subInstruction.classList.remove(
              'text-fade'
            );

          }, 1450);


          setTimeout(() => {

            actionButton.hidden =
              false;


            actionButton.textContent =
              'WALK';


            smoothButtonIn();


            actionButton.onclick =
              () => {

                nextStep();
              };

          }, 2550);
        }

      }, 1000);

  }, 900);
}


// ==================================
// WALK — DRAG
// ==================================

function renderWalk() {

  shell.classList.add(
    'route2-step',
    'walk-drag-step'
  );


  instruction.textContent =
    'MOVE AHEAD.';


  subInstruction.textContent =
    'Walk it across.';


  actionButton.hidden =
    true;


  image.style.pointerEvents =
    'auto';

  image.style.cursor =
    'grab';

  image.style.touchAction =
    'none';

  image.style.userSelect =
    'none';

  image.style.position =
    'relative';

  image.style.zIndex =
    '20';

  image.style.transition =
    'none';


  const imageWidth =
    image.offsetWidth ||
    260;


  const travelLimit =
    Math.max(
      240,
      (
        window.innerWidth / 2
      ) -
      (
        imageWidth / 2
      ) -
      40
    );


  let currentX =
    -travelLimit;


  let startTranslateX =
    currentX;


  let startPointerX =
    0;


  let dragging =
    false;

  let completed =
    false;

  let totalDrag =
    0;


  image.style.transform =
    `translate3d(${currentX}px, 0, 0)`;


  image.onpointerdown =
    function(event) {

      if (completed) {
        return;
      }


      event.preventDefault();


      dragging =
        true;


      totalDrag =
        0;


      startPointerX =
        event.clientX;


      startTranslateX =
        currentX;


      image.style.cursor =
        'grabbing';


      image.setPointerCapture(
        event.pointerId
      );
    };


  image.onpointermove =
    function(event) {

      if (
        !dragging ||
        completed
      ) {
        return;
      }


      const difference =
        event.clientX -
        startPointerX;


      totalDrag =
        Math.abs(
          difference
        );


      currentX =
        startTranslateX +
        difference;


      currentX =
        Math.max(
          -travelLimit,
          Math.min(
            travelLimit,
            currentX
          )
        );


      image.style.transform =
        `translate3d(${currentX}px, 0, 0)`;
    };


  image.onpointerup =
    function(event) {

      if (!dragging) {
        return;
      }


      dragging =
        false;


      image.style.cursor =
        'grab';


      if (
        image.hasPointerCapture(
          event.pointerId
        )
      ) {

        image.releasePointerCapture(
          event.pointerId
        );
      }


      if (
        totalDrag >= 25
      ) {

        completeWalk();
      }
    };


  image.onpointercancel =
    image.onpointerup;


  function completeWalk() {

    if (completed) {
      return;
    }


    completed =
      true;


    image.style.pointerEvents =
      'none';


    image.style.cursor =
      'default';


    moveCopyToX(
      currentX
    );


    setTimeout(() => {

      instruction.classList.add(
        'walk-text-out'
      );


      subInstruction.classList.add(
        'walk-text-out'
      );

    }, 550);


    setTimeout(() => {

      instruction.textContent =
        'LOOK AT THAT.';


      instruction.classList.remove(
        'walk-text-out'
      );

    }, 1100);


    setTimeout(() => {

      subInstruction.textContent =
        'You’re actually getting somewhere. Interesting.';


      subInstruction.classList.remove(
        'walk-text-out'
      );

    }, 1850);


    setTimeout(() => {

      actionButton.hidden =
        false;


      actionButton.textContent =
        'KEEP MOVING';


      smoothButtonIn();


      actionButton.onclick =
        () => {

          nextStep();
        };

    }, 3100);
  }
}


// ==================================
// ONE WAY — DRAG
// ==================================

function renderOneWay() {

  shell.classList.add(
    'route2-step',
    'one-way-drag-step'
  );


  instruction.textContent =
    'PICK A DIRECTION.';


  subInstruction.textContent =
    'Go ahead. Your choice.';


  actionButton.hidden =
    true;


  image.style.pointerEvents =
    'auto';

  image.style.cursor =
    'grab';

  image.style.touchAction =
    'none';

  image.style.userSelect =
    'none';

  image.style.position =
    'relative';

  image.style.zIndex =
    '20';

  image.style.transition =
    'none';


  const imageWidth =
    image.offsetWidth ||
    260;


  const travelLimit =
    Math.max(
      230,
      (
        window.innerWidth / 2
      ) -
      (
        imageWidth / 2
      ) -
      45
    );


  const computerLanding =
    Math.min(
      travelLimit,
      Math.max(
        280,
        window.innerWidth *
        0.30
      )
    );


  let dragging =
    false;

  let completed =
    false;

  let currentX =
    0;

  let startTranslateX =
    0;

  let startPointerX =
    0;

  let totalDrag =
    0;


  image.onpointerdown =
    function(event) {

      if (completed) {
        return;
      }


      event.preventDefault();


      dragging =
        true;


      totalDrag =
        0;


      startPointerX =
        event.clientX;


      startTranslateX =
        currentX;


      image.style.cursor =
        'grabbing';


      image.setPointerCapture(
        event.pointerId
      );
    };


  image.onpointermove =
    function(event) {

      if (
        !dragging ||
        completed
      ) {
        return;
      }


      const difference =
        event.clientX -
        startPointerX;


      totalDrag =
        Math.abs(
          difference
        );


      currentX =
        startTranslateX +
        difference;


      currentX =
        Math.max(
          -travelLimit,
          Math.min(
            travelLimit,
            currentX
          )
        );


      image.style.transform =
        `translate3d(${currentX}px, 0, 0)`;
    };


  image.onpointerup =
    function(event) {

      if (!dragging) {
        return;
      }


      dragging =
        false;


      if (
        image.hasPointerCapture(
          event.pointerId
        )
      ) {

        image.releasePointerCapture(
          event.pointerId
        );
      }


      image.style.cursor =
        'grab';


      if (
        totalDrag < 50
      ) {
        return;
      }


      completeOneWay();
    };


  image.onpointercancel =
    image.onpointerup;


  function completeOneWay() {

    if (completed) {
      return;
    }


    completed =
      true;


    image.style.pointerEvents =
      'none';


    image.style.cursor =
      'default';


    moveCopyToX(
      currentX
    );


    actionButton.hidden =
      true;


    instruction.classList.add(
      'text-fade'
    );


    subInstruction.classList.add(
      'text-fade'
    );


    setTimeout(() => {

      shell.classList.remove(
        'error-buzz'
      );


      void shell.offsetWidth;


      shell.classList.add(
        'error-buzz'
      );


      instruction.textContent =
        'ACTUALLY... NEVER MIND.';


      subInstruction.textContent =
        '';


      instruction.classList.remove(
        'text-fade'
      );

    }, 500);


    setTimeout(() => {

      subInstruction.textContent =
        'You only have one way.';


      subInstruction.classList.remove(
        'text-fade'
      );

    }, 1550);


    setTimeout(() => {

      const computerX =
        currentX >= 0
          ? -computerLanding
          : computerLanding;


      currentX =
        computerX;


      image.style.transition =
        'transform 0.95s cubic-bezier(.22,.61,.36,1)';


      image.style.transform =
        `translate3d(${computerX}px, 0, 0)`;


      moveCopyToX(
        computerX
      );

    }, 2750);


    setTimeout(() => {

      instruction.classList.add(
        'text-fade'
      );


      subInstruction.classList.add(
        'text-fade'
      );

    }, 4550);


    setTimeout(() => {

      instruction.textContent =
        'THIS WAY.';


      subInstruction.textContent =
        'No other options. No more arguments.';


      instruction.classList.remove(
        'text-fade'
      );


      subInstruction.classList.remove(
        'text-fade'
      );

    }, 5050);


    setTimeout(() => {

      actionButton.hidden =
        false;


      actionButton.textContent =
        'FOLLOW IT';


      smoothButtonIn();


      actionButton.onclick =
        () => {

          nextStep();
        };

    }, 6250);
  }
}


// ==================================
// DO NOT ENTER
// ==================================

function renderDoNotEnter() {

  if (
    startingSign ===
    'do-not-enter'
  ) {

    image.style.display =
      'block';


    image.style.opacity =
      '1';


    image.style.transform =
      'translateY(-22px)';


    instruction.textContent =
      'WELL, YOU ENTERED ANYWAY.';


    subInstruction.textContent =
      'You did see the sign, right?';


    actionButton.hidden =
      true;


    let buttonShown =
      false;


    function standaloneBlocked(
      event
    ) {

      if (
        event.target.closest(
          '.top-nav'
        ) ||

        event.target.closest(
          '.action-button'
        )
      ) {
        return;
      }


      shell.classList.remove(
        'error-buzz'
      );


      void shell.offsetWidth;


      shell.classList.add(
        'error-buzz'
      );


      showFeedback(
        'Oops. You have nowhere to go.',
        event.clientX,
        event.clientY
      );


      if (!buttonShown) {

        buttonShown =
          true;


        setTimeout(() => {

          actionButton.hidden =
            false;


          actionButton.textContent =
            'WELL... WHAT NOW?';


          smoothButtonIn();


          actionButton.onclick =
            () => {

              document.removeEventListener(
                'click',
                standaloneBlocked
              );


              showRoute2Final();
            };

        }, 900);
      }
    }


    setTimeout(() => {

      document.addEventListener(
        'click',
        standaloneBlocked
      );

    }, 650);


    return;
  }


  image.style.display =
    'none';


  instruction.style.marginTop =
    '0';


  instruction.textContent =
    'ALMOST THERE.';


  subInstruction.textContent =
    'You’re finally making progress.';


  actionButton.hidden =
    true;


  setTimeout(() => {

    instruction.classList.add(
      'text-fade'
    );


    subInstruction.classList.add(
      'text-fade'
    );

  }, 2600);


  setTimeout(() => {

    instruction.textContent =
      '';


    subInstruction.textContent =
      '';

  }, 3100);


  setTimeout(() => {

    image.style.display =
      'block';


    image.style.opacity =
      '0';


    instruction.style.marginTop =
      '48px';


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        image.style.opacity =
          '1';

      });

    });

  }, 3500);


  setTimeout(() => {

    instruction.textContent =
      'OH SHIT.';


    subInstruction.textContent =
      'You should’ve seen this coming.';


    instruction.classList.remove(
      'text-fade'
    );


    subInstruction.classList.remove(
      'text-fade'
    );


    document.addEventListener(
      'click',
      noGoingBack
    );

  }, 4550);


  function noGoingBack(
    event
  ) {

    if (
      event.target.closest(
        '.top-nav'
      ) ||

      event.target.closest(
        '.action-button'
      )
    ) {
      return;
    }


    shell.classList.remove(
      'error-buzz'
    );


    void shell.offsetWidth;


    shell.classList.add(
      'error-buzz'
    );


    showFeedback(
      'Well, there’s no going back.',
      event.clientX,
      event.clientY
    );
  }


  setTimeout(() => {

    actionButton.hidden =
      false;


    actionButton.textContent =
      'WELL... WHAT NOW?';


    smoothButtonIn();


    actionButton.onclick =
      () => {

        document.removeEventListener(
          'click',
          noGoingBack
        );


        showRoute2Final();
      };

  }, 5950);
}


// ==================================
// ENTER
// ==================================

function renderEnter() {

  shell.classList.add(
    'route3-step',
    'enter-step'
  );


  image.style.display =
    'block';


  image.style.opacity =
    '1';


  image.style.pointerEvents =
    'auto';


  image.style.cursor =
    'pointer';


  instruction.textContent =
    'COME IN.';


  subInstruction.textContent =
    'What could possibly go wrong?';


  actionButton.hidden =
    true;


  image.classList.add(
    'can-interact'
  );


  image.onclick =
    (event) => {

      event.stopPropagation();


      image.onclick =
        null;


      image.style.cursor =
        'default';


      image.classList.remove(
        'can-interact'
      );


      image.classList.add(
        'enter-through'
      );


      setTimeout(() => {

        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );

      }, 750);


      setTimeout(() => {

        instruction.textContent =
          'WELL, NOW THAT YOU’RE IN.';


        subInstruction.textContent =
          'Isn’t it a bit too late to reconsider?';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 1300);


      setTimeout(() => {

        actionButton.hidden =
          false;


        actionButton.textContent =
          'KEEP GOING';


        smoothButtonIn();


        actionButton.onclick =
          () => {

            nextStep();
          };

      }, 3150);
    };
}


// ==================================
// NOTICE
// ==================================

function renderNotice() {

  shell.classList.add(
    'route3-step',
    'notice-step'
  );


  instruction.textContent =
    'NOTICE ANYTHING?';


  subInstruction.textContent =
    'You came all this way. Might as well pretend you’re observant.';


  actionButton.hidden =
    true;


  image.style.pointerEvents =
    'auto';


  image.style.cursor =
    'pointer';


  image.classList.add(
    'notice-moving',
    'can-interact'
  );


  let noticeClicks =
    0;


  image.onclick =
    (event) => {

      event.stopPropagation();


      noticeClicks++;


      // ==================================
      // FIRST CLICK — SHAKE / TEASE
      // ==================================

      if (
        noticeClicks === 1
      ) {

        /*
           QUICK SHAKE WHILE THE SIGN
           CONTINUES MOVING
        */

        image.animate(
          [
            {
              rotate: '0deg',
              scale: '1'
            },

            {
              rotate: '-5deg',
              scale: '1.04'
            },

            {
              rotate: '5deg',
              scale: '1.04'
            },

            {
              rotate: '-4deg',
              scale: '1.03'
            },

            {
              rotate: '4deg',
              scale: '1.02'
            },

            {
              rotate: '0deg',
              scale: '1'
            }
          ],

          {
            duration: 520,

            easing:
              'cubic-bezier(.22,.61,.36,1)'
          }
        );


        /*
           FADE ORIGINAL TEXT OUT
        */

        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );


        /*
           CHANGE COPY
        */

        setTimeout(() => {

          instruction.textContent =
            'LOOK MORE CAREFULLY.';


          subInstruction.textContent =
            'There’s more to it.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 500);


        /*
           SIGN KEEPS MOVING.
           WAIT FOR SECOND CLICK.
        */

        return;
      }


      // ==================================
      // SECOND CLICK — CAUGHT
      // ==================================

      image.onclick =
        null;


      image.style.cursor =
        'default';


      image.classList.remove(
        'can-interact'
      );


      /*
         FREEZE THE SIGN AT ITS CURRENT
         VISUAL POSITION FIRST SO IT
         DOESN'T SNAP WHEN THE SWEEP
         ANIMATION IS REMOVED.
      */

      const currentTransform =
        window.getComputedStyle(
          image
        ).transform;


      image.style.transform =
        currentTransform;


      image.classList.remove(
        'notice-moving'
      );


      /*
         FORCE THE BROWSER TO REGISTER
         THE CURRENT POSITION
      */

      void image.offsetWidth;


      /*
         NOW GLIDE BACK TO CENTER
         SMOOTHLY
      */

      image.style.transition =
        'transform 1.05s cubic-bezier(.16, 1, .3, 1)';


      image.style.transform =
        'translateX(0) scale(1.05)';


      /*
         LET THE SIGN TRAVEL BACK
         BEFORE THE COPY STARTS CHANGING
      */

      setTimeout(() => {

        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );

      }, 750);


      /*
         FINAL RESPONSE
      */

      setTimeout(() => {

        instruction.textContent =
          'THERE IT IS.';


        subInstruction.textContent =
          'Look at you paying attention. Didn’t see that coming.';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 1300);


      /*
         BUTTON AFTER THE RESPONSE
         HAS HAD TIME TO SIT
      */

      setTimeout(() => {

        actionButton.hidden =
          false;


        actionButton.textContent =
          'WHAT’S NEXT?';


        smoothButtonIn();


        actionButton.onclick =
          () => {

            nextStep();
          };

      }, 2850);
    };
}

// ==================================
// CAUTION
// ==================================

function renderCaution() {

  shell.classList.add(
    'route3-step',
    'caution-step'
  );


  instruction.textContent =
    'CAREFUL.';


  subInstruction.textContent =
    'For once, just don’t touch anything.';


  actionButton.hidden =
    true;


  let hazard =
    null;


  let waiting =
    true;


  let warningActive =
    false;


  function warnAnywhere(
    event
  ) {

    if (
      !waiting ||
      !warningActive ||
      event.target.closest(
        '.top-nav'
      ) ||
      event.target.closest(
        '.route3-hazard'
      )
    ) {

      return;
    }


    shell.classList.remove(
      'error-buzz'
    );


    void shell.offsetWidth;


    shell.classList.add(
      'error-buzz'
    );


    showFeedback(
      'You were told not to touch anything.',
      event.clientX,
      event.clientY
    );
  }


  setTimeout(() => {

    warningActive =
      true;


    document.addEventListener(
      'click',
      warnAnywhere
    );

  }, 700);


  setTimeout(() => {

    hazard =
      document.createElement(
        'div'
      );


    hazard.className =
      'route3-hazard';


    hazard.innerHTML = `
      <span>CAUTION</span>
      <span>CAUTION</span>
      <span>CAUTION</span>
      <span>CAUTION</span>
      <span>CAUTION</span>
    `;


    stage.appendChild(
      hazard
    );


    hazard.addEventListener(
      'click',
      (event) => {

        event.stopPropagation();


        if (!waiting) {
          return;
        }


        hazard.classList.add(
          'hazard-red'
        );


        shell.classList.remove(
          'error-buzz'
        );


        void shell.offsetWidth;


        shell.classList.add(
          'error-buzz'
        );


        showFeedback(
          'AGAIN? You literally did that on purpose.',
          event.clientX,
          event.clientY - 90
        );
      }
    );

  }, 2000);


  setTimeout(() => {

    waiting =
      false;


    warningActive =
      false;


    document.removeEventListener(
      'click',
      warnAnywhere
    );


    if (hazard) {

      hazard.classList.add(
        'hazard-out'
      );


      setTimeout(() => {

        hazard.remove();

      }, 600);
    }


    setTimeout(() => {

      instruction.classList.add(
        'text-fade'
      );


      subInstruction.classList.add(
        'text-fade'
      );


      setTimeout(() => {

        instruction.textContent =
          'CLEAR.';


        subInstruction.textContent =
          'See? Sometimes doing nothing actually works.';


        instruction.classList.remove(
          'text-fade'
        );


        subInstruction.classList.remove(
          'text-fade'
        );

      }, 400);


      setTimeout(() => {

        actionButton.hidden =
          false;


        actionButton.textContent =
          'GET ME OUT OF HERE';


        smoothButtonIn();


        actionButton.onclick =
          () => {

            nextStep();
          };

      }, 2100);

    }, 600);

  }, 8800);
}


// ==================================
// EXIT
// ==================================

function renderExit() {

  shell.classList.add(
    'route3-step',
    'exit-step'
  );


  instruction.textContent =
    'THERE’S THE EXIT.';


  subInstruction.textContent =
    'This should be easy. Just click the EXIT sign.';


  actionButton.hidden =
    true;


  image.classList.add(
    'exit-catch'
  );


  image.style.pointerEvents =
    'auto';


  image.style.cursor =
    'pointer';


  let clickCount =
    0;


  let moving =
    false;


  let ready =
    false;


  image.onclick =
    (event) => {

      event.stopPropagation();


      if (moving) {
        return;
      }


      if (ready) {

        image.onclick =
          null;


        image.style.cursor =
          'default';


        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );


        setTimeout(() => {

          instruction.textContent =
            'FINALLY.';


          subInstruction.textContent =
            'You may leave now.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 550);


        setTimeout(() => {

          instruction.classList.add(
            'text-fade'
          );


          subInstruction.classList.add(
            'text-fade'
          );


          image.classList.add(
            'exit-leaving'
          );

        }, 2650);


        setTimeout(() => {

          shell.classList.add(
            'exit-message-center'
          );


          image.style.display =
            'none';


          instruction.textContent =
            'EXITING...';


          subInstruction.textContent =
            'Don’t worry. We’re actually letting you go this time.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 3250);


        setTimeout(() => {

          instruction.classList.add(
            'text-fade'
          );


          subInstruction.classList.add(
            'text-fade'
          );

        }, 5550);


        setTimeout(() => {

          showRoute3Final();

        }, 6500);


        return;
      }


      moving =
        true;


      clickCount++;


      if (
        clickCount === 1
      ) {

        image.style.transform =
          'translate(min(20vw, 220px), -65px)';


        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );


        setTimeout(() => {

          instruction.textContent =
            'SERIOUSLY?';


          subInstruction.textContent =
            'You really thought it was going to be that easy? Click it again.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 500);

      }

      else {

        image.style.transform =
          'translate(0, 0)';


        instruction.classList.add(
          'text-fade'
        );


        subInstruction.classList.add(
          'text-fade'
        );


        setTimeout(() => {

          instruction.textContent =
            'OKAY. ONE LAST TIME.';


          subInstruction.textContent =
            'The exit has finished playing hard to get.';


          instruction.classList.remove(
            'text-fade'
          );


          subInstruction.classList.remove(
            'text-fade'
          );

        }, 500);


        ready =
          true;


        image.classList.add(
          'exit-ready'
        );
      }


      setTimeout(() => {

        moving =
          false;

      }, 1050);
    };
}


// ==================================
// ROUTE 3 FINAL
// ==================================

function showRoute3Final() {

  shell.className =
    'command-shell';


  shell.innerHTML = `

    <div class="final-screen">

      <div class="final-eyebrow">
        ESCAPE SUCCESSFUL
      </div>

      <h1 class="final-title">
        CONGRATULATIONS. YOU FINALLY ESCAPED.
      </h1>

      <p class="final-copy">

        You came in.
        <br>

        You stayed attentive.
        <br>

        You waited for danger to pass.
        <br>

        And then you had to negotiate with an exit sign. Seriously?

        <br><br>

        <strong>
          All that effort just to fix a problem you created for yourself.
        </strong>

      </p>

      <div class="final-actions">

        <a
          href="../index.html"
          class="final-link final-link-back"
        >
          TRY ANOTHER ROUTE
        </a>

        <a
          href="../about/index.html"
          class="final-link final-link-forward"
        >
          WHY DID I DO THIS?
        </a>

      </div>

    </div>

  `;
}


// ==================================
// ROUTE 2 FINAL
// ==================================

function showRoute2Final() {

  shell.className =
    'command-shell';


  shell.innerHTML = `

    <div class="final-screen">

      <div class="final-eyebrow">
        ROUTE BLOCKED
      </div>

      <h1 class="final-title">
        WELL... THAT WAS A LOT FOR NOTHING.
      </h1>

      <p class="final-copy">

        You waited.
        <br>

        You walked.
        <br>

        You followed instructions.

        <br><br>

        And just when things were finally looking promising

        <br><br>

        <strong>
          Plot twist. The route had other plans.
        </strong>

      </p>

      <div class="final-actions">

        <a
          href="../index.html"
          class="final-link final-link-back"
        >
          FIND ANOTHER WAY
        </a>

        <a
          href="../about/index.html"
          class="final-link final-link-forward"
        >
          WHY DID I DO THIS?
        </a>

      </div>

    </div>

  `;
}


// ==================================
// ROUTE 1 FINAL
// ==================================

function showFinal() {

  shell.className =
    'command-shell';


  shell.innerHTML = `

    <div class="final-screen">

      <div class="final-eyebrow">
        DESTINATION COMPLETED
      </div>

      <h1 class="final-title">
        CONGRATULATIONS.
      </h1>

      <p class="final-copy">

        You stopped.
        <br>

        You waited.
        <br>

        You pushed.
        <br>

        You moved left.
        <br>

        You pulled.

        <br><br>

        And somehow, at no point did you ask why.

        <br><br>

        You followed every instruction perfectly.

        <br><br>

        <strong>
          Well, we never said it would lead anywhere.
        </strong>

      </p>

      <div class="final-actions">

        <a
          href="../index.html"
          class="final-link final-link-back"
        >
          GO FOR IT AGAIN
        </a>

        <a
          href="../about/index.html"
          class="final-link final-link-forward"
        >
          WHY DID I DO THIS?
        </a>

      </div>

    </div>

  `;
}


// ==================================
// START
// ==================================

renderStep(
  activeRoute[
    currentIndex
  ]
);