import { yupResolver } from '@hookform/resolvers/yup';
import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AddContactUs = () => {
    const [desc, setDesc] = useState(EditorState.createEmpty())

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
          categoryName: "",
        },
        // resolver: yupResolver(schema),
      });


    const addCategoryStyle = {

        categoryTitle: {
          padding: "10px 0",
          background: "#A7A2A2",
          border: "1px solid #A7A2A2",
        },
    
        modelHeader: {
          color: "#fff",
          marginLeft: "50px",
        },
    
        categoryContainer: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px"
        },
    
        categoryForm: {
          width: "50rem",
          padding: "20px 0",
        },
    
        modalBody: {
          background: "#fff",
          padding: "20px 50px",
        },
    
        buttons: {
          margin: "30px 0",
          paddingBottom: "30px",
        },
    
        marginStyle: {
          marginTop: "20px",
        }
      }
      console.log('desc', desc)
  return (
    <div>
      <h1>Add Contact us</h1>
      <Editor
              editorState={desc}
              wrapperClassName='toolbar-bottom'
              toolbar={{
                options: ['inline', 'textAlign'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline']
                }
              }}
              onEditorStateChange={data => setDesc(data)}
            />
    </div>
  )
}

export default AddContactUs
