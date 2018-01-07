const gui = require('nw.gui');
const options = nw.App.manifest.options || {};
gui.App.argv.forEach(a => {
  if (a.includes('verbose')) { options.verbose = true }
});

const appendLibsToWindow = win => {
  win.window.CPW_OPTIONS = options;
  win.window.CPW_DIR = __dirname;

  // node core libs etc.
  win.window.NODE_OS = require('os');
  win.window.NODE_FS = require('fs');
  win.window.NODE_NET = require('net');
  win.window.NODE_TEXT2PNG = require('text2png');
  win.window.NW_EXIT = gui.App.quit;

  // nw win object
  win.window.NW_WIN = win;
}

nw.Window.open('./dist/index.html', {
  width: 250,
  height: 170,
  show_in_taskbar: false,
}, win => {
  appendLibsToWindow(win);
  setTimeout(() => {
    win.hide()
  }, 750)

  win.on('minimize', () => {
    win.hide();
  });
  win.on('focus', () => {
    appendLibsToWindow(win);
  });
  win.on('loading', () => {
    appendLibsToWindow(win);
  });
  win.on('loaded', () => {
    appendLibsToWindow(win);
  });
});
