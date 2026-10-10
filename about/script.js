// ==================================
// SCREEN NAVIGATION
// ==================================

const nextButtons =
  document.querySelectorAll(
    '[data-next]'
  );


function showScreen(number) {

  const current =
    document.querySelector(
      '.about-screen.active'
    );

  const next =
    document.querySelector(
      `[data-screen="${number}"]`
    );


  if (!next) {
    return;
  }


  if (current) {

    current.classList.add(
      'leaving'
    );

    current.classList.remove(
      'active'
    );


    setTimeout(() => {

      current.classList.remove(
        'leaving'
      );

    }, 550);
  }


  setTimeout(() => {

    next.classList.add(
      'active'
    );


    if (
      String(number) === '2'
    ) {

      runConceptAnimation();

    }

  }, 300);
}


nextButtons.forEach(
  (button) => {

    button.addEventListener(
      'click',
      () => {

        showScreen(
          button.dataset.next
        );

      }
    );
  }
);


// ==================================
// CONCEPT ANIMATION
// ==================================

const conceptWrong =
  document.getElementById(
    'conceptWrong'
  );

const conceptCorrect =
  document.getElementById(
    'conceptCorrect'
  );

const conceptBody =
  document.getElementById(
    'conceptBody'
  );


let conceptPlayed =
  false;


function runConceptAnimation() {

  if (conceptPlayed) {
    return;
  }

  conceptPlayed = true;


  // Let:
  // "YOU THOUGHT YOU WERE NAVIGATING THE WEBSITE."
  // sit on its own for longer.

  setTimeout(() => {

    conceptWrong.classList.add(
      'crossed'
    );

  }, 1800);


  // Slower reveal of:
  // "BUT ACTUALLY, THE WEBSITE WAS NAVIGATING YOU."

  setTimeout(() => {

    conceptCorrect.classList.add(
      'show'
    );

  }, 3200);


  // Let both statements sit for a moment,
  // then bring in the explanation.

  setTimeout(() => {

    conceptBody.classList.add(
      'show'
    );

  }, 5000);
}


// ==================================
// FINAL QUESTION
// ==================================

const questionYes =
  document.getElementById(
    'questionYes'
  );

const questionNo =
  document.getElementById(
    'questionNo'
  );

const questionResponse =
  document.getElementById(
    'questionResponse'
  );

const finalAnswer =
  document.getElementById(
    'finalAnswer'
  );


let finalRevealed = false;


function revealFinalMessage() {

  if (finalRevealed) {
    return;
  }

  finalRevealed = true;


  setTimeout(() => {

    finalAnswer.classList.remove(
      'hidden'
    );

  }, 900);
}


questionYes.addEventListener(
  'click',
  () => {

    questionResponse.textContent =
      'Sure. We totally believe you.';

    revealFinalMessage();
  }
);


questionNo.addEventListener(
  'click',
  () => {

    questionResponse.textContent =
      'At least you’re self-aware.';

    revealFinalMessage();
  }
);