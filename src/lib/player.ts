import h from '@chronocide/hyper';

export type PlayerOptions = {
  id: string;
  name: string;
  authority: string;
  board: HTMLElement;
  hidden?: boolean;
};

export default class Player {
  readonly #root: HTMLElement;
  readonly #authority: HTMLElement;

  get authority(): number {
    return +this.#authority.textContent;
  }

  set authority(authority: number) {
    this.#authority.textContent = `${authority}`;
  }

  get hidden(): boolean {
    return this.#root.hasAttribute('hidden');
  }

  set hidden(hidden: boolean) {
    this.#root.toggleAttribute('hidden', hidden);
  }

  constructor(options: PlayerOptions) {
    this.#authority = h('dd')({ id: `${options.id}-authority` })(options.authority);

    const increase = h('button')({ 'type': 'button', 'aria-controls': `${options.id}-authority` })('+');
    const decrease = h('button')({ 'type': 'button', 'aria-controls': `${options.id}-authority` })('-');
    const modifier = h('input')({
      id: `${options.id}-modifier`,
      type: 'text',
      value: '1',
      inputmode: 'numeric',
      pattern: '[0-9]*'
    })();

    this.#root = h('article')({ id: options.id, hidden: options.hidden })(
      h('h2')({ contenteditable: true })(options.name),
      h('dl')()(
        h('dt')({ class: 'sr-only' })('Authority'),
        this.#authority
      ),
      h('controls')()(
        decrease,
        h('label')({ for: `${options.id}-modifier`, class: 'sr-only' })('Modifier'),
        modifier,
        increase
      )
    );

    increase.addEventListener('click', () => {
      this.authority = this.authority + +modifier.value;
    }, { passive: true });

    decrease.addEventListener('click', () => {
      this.authority = this.authority - +modifier.value;
    }, { passive: true });

    options.board.append(this.#root);
  }
}
