export default class Audio {
  readonly #context: AudioContext;
  readonly #source: AudioBufferSourceNode;

  static speak(text: string) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
  
  constructor() {
    this.#context = new AudioContext();
    this.#source = this.#context.createBufferSource();
  }

  async load(id: string) {
    const buffer = await fetch(`./assets/${id}`)
      .then(async res => res.arrayBuffer())
      .then(async buffer => this.#context.decodeAudioData(buffer));

    this.#source.buffer = buffer;
    this.#source.connect(this.#context.destination);
  }

  play() {
    this.#source.start();
  }
}