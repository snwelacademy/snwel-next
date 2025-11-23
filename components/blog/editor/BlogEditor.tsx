'use client'

import { useEffect, useMemo } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaPlugin } from '@yoopta/editor'
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

const plugins: YooptaPlugin<any>[] = [
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


    const change = (htmlstr: string) => {
        const res = html.deserialize(editor, htmlstr);
        console.log({ res, htmlstr })
        return res;
    }

    useEffect(() => {
        function handleChange() {
            const current = (editor as any)?.getEditorValue?.();
            if (!current) return;
            try {
                onChange?.(html.serialize(editor, current));
            } catch (err) {
                console.error('Yoopta HTML serialize failed', err);
                // If serialization fails, we might want to alert the user or at least not crash
            }
        }
        editor.on('change', handleChange);

        return () => {
            editor.off('change', handleChange);
        };

    }, [editor, onChange])

    useEffect(() => {
        const htmlStr = (defaultValue ?? '').trim();
        if (!htmlStr) return;
        try {
            const val = change(htmlStr);
            if (val) editor.setEditorValue(val);
        } catch (err) {
            console.error('Yoopta HTML deserialize failed', err);
        }
    }, [defaultValue, editor])

    return (
        <YooptaEditor readOnly={readOnly} placeholder='Type here' style={{ maxWidth: "100%", width: '100%' }} editor={editor} plugins={plugins} tools={TOOLS} />
    );
};

export default Editor;