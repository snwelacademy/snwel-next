'use client'

import { useEffect, useMemo, useRef } from 'react';
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph';
import Blockqoute from '@yoopta/blockquote';
import Accordion from '@yoopta/accordion';
import Callout from '@yoopta/callout';
import Code from '@yoopta/code';
import Divider from '@yoopta/divider';
import Embed from '@yoopta/embed';
import File from '@yoopta/file';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import Table from '@yoopta/table';
import Video from '@yoopta/video';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import { html } from '@yoopta/exports'

const plugins = [
    Paragraph,
    Blockqoute,
    Accordion,
    Callout,
    Code,
    Divider,
    Embed,
    File,
    Image,
    Link,
    NumberedList,
    BulletedList,
    TodoList,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Table,
    Video
]

const TOOLS = {
    ActionMenu: {
        render: DefaultActionMenuRender,
        tool: ActionMenuList,
    },
    Toolbar: {
        render: DefaultToolbarRender,
        tool: Toolbar,
    },
    LinkTool: {
        render: DefaultLinkToolRender,
        tool: LinkTool,
    },
};

const Editor = ({ defaultValue, onChange, readOnly }: { defaultValue?: string, onChange?: (value: string) => void, readOnly?: boolean }) => {
    const editor = useMemo(() => createYooptaEditor(), []);
    const val = html.deserialize(editor, defaultValue || "")


    const change = (htmlstr: string) => {
        const res = html.deserialize(editor, htmlstr);
        console.log({ res, htmlstr })
        return res;
    }

    useEffect(() => {
        function handleChange(data: any) {
            onChange?.(html.serialize(editor, data));
        }
        editor.on('change', handleChange);

        return () => {
            editor.off('change', handleChange);
        };

    }, [])

    useEffect(() => {
        editor.setEditorValue(change(defaultValue||''))
    }, [defaultValue])

    return (
        <YooptaEditor readOnly={readOnly} placeholder='Type here' style={{maxWidth: "100%", width: '100%'}} editor={editor} plugins={plugins} tools={TOOLS} />
    );
};

export default Editor;