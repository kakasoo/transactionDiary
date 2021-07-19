class Banner {
  constructor() {
    this.banner = $('bannerImg');
    this.bannerOriginalWidth = 1920;

    const width = this.banner.style.width || this.banner.clientWidth;
    this.newFontSize = parseInt((width * 108) / this.bannerOriginalWidth);

    console.log(this.newFontSize);

    window.onresize = () => {
      const width = this.banner.style.width || this.banner.clientWidth;

      const text = this.banner.firstChild;
      this.newFontSize = parseInt((width * 108) / this.bannerOriginalWidth);
      text.style.fontSize = `${this.newFontSize}px`;
    };

    this.index = 0;
    this.textContents = [
      'Have a happy time.',
      'Leave good memories.',
      'Recall it occasionally.',
    ];

    this.setText(this.textContents[this.index++ % 3]);
    setInterval(() => {
      this.removeText();
      this.setText(this.textContents[this.index++ % 3]);
    }, 1500);
  }

  setText(textContent) {
    const text = CE('h1');
    text.innerText = textContent;
    text.style.height = '300px';
    text.style.lineHeight = '300px';
    text.style.width = '100%';
    text.style.textAlign = 'center';
    text.style.color = 'white';
    text.style.fontSize = `${this.newFontSize}px`;
    text.style.textShadow = 'black 2px 2px 10px';

    this.banner.style.display = 'flex';
    this.banner.style.alignItems = 'center';

    this.banner.appendChild(text);
  }

  removeText() {
    while (this.banner.firstChild) {
      this.banner.removeChild(this.banner.firstChild);
    }
  }
}
