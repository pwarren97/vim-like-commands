'use babel';

import VimLikeCommandsView from './vim-like-commands-view';
import { CompositeDisposable } from 'atom';

export default {

  vimLikeCommandsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vimLikeCommandsView = new VimLikeCommandsView(state.vimLikeCommandsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vimLikeCommandsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:toggle': () => this.toggle()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-down': () => moveDown()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-up': () => moveUp()
    }));

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vimLikeCommandsView.destroy();
  },

  serialize() {
    return {
      vimLikeCommandsViewState: this.vimLikeCommandsView.serialize()
    };
  },

  toggle() {
    console.log('VimLikeCommands was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

function moveDown() {
  const editor = atom.workspace.getActiveTextEditor();

  if (editor) {
    editor.moveDown(1);
  }
}

function moveUp() {
  const editor = atom.workspace.getActiveTextEditor();

  if (editor) {
    editor.moveUp(1);
  }
}
