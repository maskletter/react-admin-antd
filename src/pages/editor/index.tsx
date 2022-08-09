import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default () => {
    return <div>
        <h2> CKEditor 5 build in React</h2>
        <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor: any) => {
                // You can store the "editor" and use when it is needed.
                editor.editing.view.change((writer: any) => {
                    writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                    );
                });
            }}
            onChange={(event: any, editor: any) => {
                const data = editor.getData();
                console.log({ event, editor, data });
            }}
            onBlur={(event: any, editor: any) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event: any, editor: any) => {
                console.log('Focus.', editor);
            }}
        />
    </div>
}