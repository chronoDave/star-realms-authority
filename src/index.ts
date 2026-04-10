import Game from './lib/game.ts';
import './index.css';
import { querySelector } from './lib/dom.ts';

document.querySelectorAll('button[aria-haspopup="dialog"]').forEach(button => button.addEventListener('click', () => {
  const id = button.getAttribute('aria-controls');
  if (typeof id !== 'string') throw new Error('Missing "aria-controls"');

  (document.getElementById(id) as HTMLDialogElement | null)?.showModal();
}, { passive: true }));

const game = new Game(querySelector('main'));

document.querySelectorAll('button[data-action="reset"]').forEach(button => button.addEventListener('click', () => {
  game.reset();
}, { passive: true }));
