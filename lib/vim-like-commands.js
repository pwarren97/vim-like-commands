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
      'vim-like-commands:move-left': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveLeft(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-down': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveDown(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-up': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveUp(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-right': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveRight(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:select-left': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.selectLeft(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:select-down': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.selectDown(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:select-up': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.selectUp(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {g
      'vim-like-commands:select-right': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.selectRight(1);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-to-end-of-line': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveToEndOfLine();
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-like-commands:move-to-bottom': () => {
        const editor = atom.workspace.getActiveTextEditor();
        editor.moveToBottom();
      }
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
