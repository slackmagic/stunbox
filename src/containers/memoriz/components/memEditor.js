import React from 'react';
import PasteLinkify from 'slate-paste-linkify';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { Value } from 'slate';


const boldPlugin = MarkHotkey({
    type: 'bold',
    key: 'b',
})


const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '=', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
    PasteLinkify(),
]

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Nothing 000',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

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
    // Set the initial value when the app is first constructed.
    state = {
        value: Plain.deserialize(''),
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        console.log(JSON.stringify(value.toJSON()));
        this.setState({ value })
    }

    // Add a `renderMark` method to render marks.
    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>
            // Add our new mark renderers...
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