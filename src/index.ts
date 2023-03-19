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

const createContext = async (file: string) => {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();
  const audioBuffer = await fetch(`./assets/${file}`)
    .then(res => res.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer));

  source.buffer = audioBuffer;
  source.connect(audioContext.destination);

  return source;
};

const createLifeDown = () => createContext('life_down.wav');
const createLifeUp = () => createContext('life_up.wav');

const debounce = <T extends (...args: any[]) => any>(cb: T, n: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(cb(...args)), n);
  });
};

document.querySelector<HTMLButtonElement>('header > button.reset')?.addEventListener('click', update);

/** Players */
const init = async () => {
  const speak = (text: string) => speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  const debouncedLifeDown = debounce(async (score: string) => {
    const lifeDown = await createLifeDown();
    lifeDown.start();
    lifeDown.addEventListener('ended', () => {
      lifeDown.stop();
      speak(score);
    });
  }, 1000);

  const debouncedLifeUp = debounce(async (score: string) => {
    const lifeUp = await createLifeUp();
    lifeUp.start();
    lifeUp.addEventListener('ended', () => {
      lifeUp.stop();
      speak(score);
    });
  }, 1000);

  Array.from(document.querySelectorAll('.player'))
    .forEach(player => {
      const buttonAdd = player.querySelector<HTMLButtonElement>('button.add');
      const buttonSubtract = player.querySelector<HTMLButtonElement>('button.subtract');
      const score = player.querySelector<HTMLDivElement>('.score > span');

      buttonAdd?.addEventListener('click', () => {
        if (score) score.innerText = `${parseInt(score.innerText, 10) + 1}`;
        if (score?.innerText) debouncedLifeUp(score.innerText);
      });

      buttonSubtract?.addEventListener('click', () => {
        if (score) score.innerText = `${parseInt(score.innerText, 10) - 1}`;
        if (score?.innerText) debouncedLifeDown(score.innerText);
      });
    });
}

init();
update();

/** Service Worker */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/star-realms-authority/service.js')
      .catch(console.error);
  });
}
