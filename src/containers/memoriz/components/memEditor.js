import React from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { Value } from 'slate';


const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
    MarkHotkey({ key: '=', type: 'code' }),
    MarkHotkey({ key: ')', type: 'quote' }),
];


function MarkHotkey(options) {
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

class memEditor extends React.Component {
    state = {
        value: Plain.deserialize(this.props.value),
    }

    onChange = ({ value }) => {
        if (value.document != this.state.value.document) {
            console.log(Plain.serialize(value));
            this.props.onChange(Plain.serialize(value));
        }

        this.setState({ value })
    }


    // Add a `renderMark` method to render marks.
    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>
            case 'code':
                return <code>{props.children}</code>
            case 'italic':
                return <em>{props.children}</em>
            case 'strikethrough':
                return <del>{props.children}</del>
            case 'underline':
                return <u>{props.children}</u>
            default:
                return next()
        }
    }

    // Render the editor.
    render() {
        return <Editor plugins={plugins} value={this.state.value} onChange={this.onChange} renderMark={this.renderMark} />
    }
}

export default memEditor