import Player from './player.ts';
import { getElementById } from './dom.ts';

export default class Game {
  readonly #playerCount: HTMLSelectElement;
  readonly #authority: HTMLInputElement;
  readonly #players: readonly [Player, Player, Player, Player];

  constructor(board: HTMLElement) {
    this.#playerCount = getElementById('players');
    this.#authority = getElementById('authority');

    const players = Array.from({ length: 4 }).map((_, i) => new Player({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      board,
      authority: this.#authority.value,
      hidden: i >= +this.#playerCount.value
    }));
    Object.seal(players);

    this.#players = players as [Player, Player, Player, Player];

    this.#playerCount.addEventListener('change', () => {
      this.#players.forEach((player, i) => {
        player.hidden = i >= +this.#playerCount.value;
      });
    }, { passive: true });
  }

  reset() {
    this.#playerCount.value = this.#playerCount.options.item(0)?.value ?? '2';
    this.#authority.value = '50';
  }
}