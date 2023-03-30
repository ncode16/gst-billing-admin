import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const Description = ({ onChange, value, error, showError }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  // console.log('error', error)

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const editorStyle = {
    height: "150px",
    marginBottom: "30px",
    border: "1px solid black"
  }

  return (
    <React.Fragment>
      <div className="editor">
        <Editor
          spellCheck
          editorState={editorState}
          editorStyle={editorStyle}
          onEditorStateChange={onEditorStateChange}
        />
          {showError && error && (
        <span className="error-text">{error}</span>
      )}
      </div>
    </React.Fragment>
  );
};

export default Description;