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

import styles from './Editor.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import toolbarStyles from './toolbar.css';
import buttonStyles from './button.css';

const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const emojiPlugin = createEmojiPlugin({ useNativeArt: true });
const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles }
});

const plugins = [linkifyPlugin, emojiPlugin, toolbarPlugin];

export class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.content))
      )
    };
  }

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
            </>
          )}
        </toolbarPlugin.Toolbar>
        <emojiPlugin.EmojiSuggestions />
      </div>
    );
  }
}
