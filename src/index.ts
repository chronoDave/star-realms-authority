/** Init */
const updatePlayerCount = (n: number) => Array.from(document.querySelectorAll('.player'))
  .forEach((player, i) => {
    player.classList.toggle('hidden', i >= n);
    player.setAttribute('aria-hidden', `${i >= n}`);
  });

const updateBaseAuthority = (n: number) => Array.from(document.querySelectorAll('.player > .score > span'))
  .forEach(score => {
    score.innerHTML = `${n}`;
  });

const update = () => {
  const inputPlayers = document.querySelector<HTMLInputElement>('header select[name="players"]');
  const inputAuthority = document.querySelector<HTMLInputElement>('header input[name="authority"]');

  updatePlayerCount(inputPlayers?.value ? parseInt(inputPlayers.value, 10) : 2);
  updateBaseAuthority(inputAuthority?.value ? parseInt(inputAuthority?.value, 10) : 50);
};

document.querySelector<HTMLButtonElement>('header > button.reset')?.addEventListener('click', update);

/** Players */
Array.from(document.querySelectorAll('.player'))
  .forEach(player => {
    const buttonAdd = player.querySelector<HTMLButtonElement>('button.add');
    const buttonSubtract = player.querySelector<HTMLButtonElement>('button.subtract');
    const score = player.querySelector<HTMLDivElement>('.score > span');

    buttonAdd?.addEventListener('click', () => {
      if (score) score.innerText = `${parseInt(score.innerText, 10) + 1}`;
    });

    buttonSubtract?.addEventListener('click', () => {
      if (score) score.innerText = `${parseInt(score.innerText, 10) - 1}`;
    });
  });

update();

/** Service Worker */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service.js')
      .catch(console.error);
  });
}
