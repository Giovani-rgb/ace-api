class BannerDTO {
  constructor({ id, title, message, type, backgroundImage, link, timeleft }) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.type = type;
    this.backgroundImage = backgroundImage;
    this.link = link;
    this.timeleft = timeleft;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      message: this.message,
      type: this.type,
      backgroundImage: this.backgroundImage,
      link: this.link,
      timeleft: this.timeleft,
    };
  }
}

module.exports = BannerDTO;
