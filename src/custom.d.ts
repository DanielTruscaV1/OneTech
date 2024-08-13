import { EditorState as BasicSetupEditorState } from '@codemirror/basic-setup/node_modules/@codemirror/state/dist/index';
import { EditorState as MainEditorState } from '@codemirror/state/dist/index';

type CustomEditorState = MainEditorState & {
  selection: {
    ranges: BasicSetupEditorState['selection']['ranges'];
  };
};
