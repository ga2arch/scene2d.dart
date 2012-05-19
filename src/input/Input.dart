class Input {
  
  CanvasElement canvas;
  
  static num mouseX = 0, mouseY = 0;
  static Map _pressed;
  static Input _instance;
  
  Input(this.canvas) {
    _pressed = new Map();
    onMouseMove();
    onKeyDown();
    onKeyUp();
  }
  
  static Input getInstance(CanvasElement canvas) {
    if (_instance == null) {
      _instance = new Input(canvas);
    }
    return _instance;
  }
  
  void onMouseMove() {
    canvas.$dom_addEventListener('mousemove', (evt) {
      mouseX = evt.offsetX;
      mouseY = evt.offsetY;
    });
  }
  
  void onKeyDown() {
    document.window.$dom_addEventListener('keydown', (evt) {
      evt.preventDefault();
      _pressed[evt.keyCode] = true;
    });
  }
  
  void onKeyUp() {
    document.window.$dom_addEventListener('keyup', (evt) {
      evt.preventDefault();
      _pressed.remove(evt.keyCode);
    });
  }
  
  static bool isKeyPressed(num keyCode) {
    if (_pressed.containsKey(keyCode)) return _pressed[keyCode];
    else return false;
  }
}
