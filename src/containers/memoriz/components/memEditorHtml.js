import React from 'react';
import PasteLinkify from 'slate-paste-linkify';
import Html from 'slate-html-serializer'
import { Popup } from 'semantic-ui-react'
import { Editor } from 'slate-react';

const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
    BlockHotkey({ key: '=', type: 'code' }),
    BlockHotkey({ key: ')', type: 'quote' }),
    new PasteLinkify(),
];

const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code'
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline'
}

const INLINE_TAGS = {
    a: 'link'
}



const rules = [
    {
        deserialize(el, next) {
            var type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                }
            }

        },
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'code':
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        )
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
                    case 'quote':
                        return <blockquote>{children}</blockquote>
                    default:
                        return { children }
                }
            }

        },
    },
    {
        deserialize(el, next) {
            var type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }

        },
        serialize(obj, children) {
            if (obj.object === 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'italic':
                        return <em>{children}</em>
                    case 'underline':
                        return <u>{children}</u>
                    default:
                        return { children }
                }
            }
        },
    },
    {
        deserialize(el, next) {
            var type = INLINE_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'inline',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }

        },
        serialize(obj, children) {
            if (obj.object === 'inline') {
                switch (obj.type) {
                    case 'link':
                        return <a href={children.get(0).get(0)}>{children}</a>
                    default:
                        return { children }
                }
            }
        },
    }
]


function MarkHotkey(options) {
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key !== key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

function BlockHotkey(options) {
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key !== key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            editor.setBlocks(type)
        },
    }
}


const html = new Html({ rules })

class memEditorHtml extends React.Component {
    state = {
        //value: html.deserialize("<p>Mon texte en <strong>GRAS</strong></p><p>Mon texte en <em>italique</em></p><p>Mon texte en <u>souligné</u></p><p><u><strong><em>ALL OF THAT</em></strong></u></p>"),
        value: html.deserialize(this.props.value),
    }


    commands = {
        wrapLink(change, url) {
            change.wrapInline({ type: 'link', data: { url } })
        },
        unwrapLink(change) {
            change.unwrapInline('link')
        },
    }

    queries = {
        isLinkActive(editor, value) {
            //If false => no exit of the link block
            return true
        },
    }

    onChange = ({ value }) => {
        // When the document changes, save the serialized HTML to Local Storage.
        if (value.document !== this.state.value.document) {
            this.props.onChange(html.serialize(value));
        }

        this.setState({ value })
    }


    render() {
        return (
            <Editor
                plugins={plugins}
                value={this.state.value}
                onChange={this.onChange}
                commands={this.commands}
                queries={this.queries}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
            />
        )
    }

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'link':
                return (
                    <Popup inverted hideOnScroll on='click'
                        trigger={<a {...props.attributes} href={props.node.data.get('url')} target="_blank" >{props.children}</a>}>
                        <a href={props.children[0].props.node.text} target="_blank" >Acceder au lien</a>
                    </Popup>
                )
            case 'code':
                return (
                    <pre {...props.attributes}>
                        <code>{props.children}</code>
                    </pre>
                )
            case 'paragraph':
                return (
                    <p {...props.attributes} className={props.node.data.get('className')}>
                        {props.children}
                    </p>
                )
            case 'quote':
                return <blockquote {...props.attributes}>{props.children}</blockquote>
            default:
                return next()
        }
    }

    // Add a `renderMark` method to render marks.
    renderMark = (props, editor, next) => {
        const { mark, attributes } = props
        switch (mark.type) {

            case 'bold':
                return <strong {...attributes}>{props.children}</strong>
            case 'italic':
                return <em {...attributes}>{props.children}</em>
            case 'underline':
                return <u {...attributes}>{props.children}</u>
            default:
                return next()
        }
    }
}

export default memEditorHtml