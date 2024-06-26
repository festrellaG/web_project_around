export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Toma un elemento del DOM y lo agrega al contenedor
  addItem(element) {
    this._container.append(element);
  }

  //Limpia el contenedor
  clear() {
    this._container.innerHTML = "";
  }

  //Renderiza todos los elementos en la página
  renderer() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
