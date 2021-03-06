import React from 'react';
import InlineEditor from 'draft-js-plugins-editor';
import {
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton
} from 'draft-js-buttons';

import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';

import styles from './Editor.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import toolbarStyles from './toolbar.css';
import buttonStyles from './button.css';
import emojiStyles from './emoji.css';

const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
  theme: emojiStyles
});
const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles }
});
const undoPlugin = createUndoPlugin({ theme: { buttonStyles } });

const plugins = [
  linkifyPlugin,
  emojiPlugin,
  toolbarPlugin,
  createBlockBreakoutPlugin(),
  undoPlugin
];

export class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.content))
      )
    };

    document.addEventListener('keyup', this.handleKeyboard);
  }

  handleKeyboard = ev => {
    if (!ev.ctrlKey) return;
    switch (ev.keyCode) {
      case 90:
        this.undo();
        break;

      case 89:
        this.redo();
        break;
    }
  };

  undo = () => {
    this.setState({
      editorState: EditorState.undo(this.state.editorState)
    });
  };

  redo = () => {
    this.setState({
      editorState: EditorState.redo(this.state.editorState)
    });
  };

  componentDidUpdate({ id }) {
    if (this.props.id !== id) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(this.props.content))
        )
      });
    }
  }

  onChange = editorState => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    this.props.saveContent(markup);
    this.setState({ editorState });
  };

  render() {
    return (
      <div className={styles.editorWrapper}>
        <InlineEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <toolbarPlugin.Toolbar>
          {externalProps => (
            <>
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <Separator {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <Separator {...externalProps} />
              <undoPlugin.UndoButton {...externalProps} />
              <undoPlugin.RedoButton {...externalProps} />
            </>
          )}
        </toolbarPlugin.Toolbar>
        <emojiPlugin.EmojiSuggestions />
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyboard);
  }
}
