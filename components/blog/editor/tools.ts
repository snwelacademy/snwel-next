// tools.js
import Table from '@editorjs/table'
import List from '@editorjs/list'
// import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
// import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
//   embed: Embed,
  table: Table,
  list: List,
//   warning: Warning,
  code: Code,
//   linkTool: LinkTool,
  image: Image,
//   raw: Raw,
  header: Header,
  quote: Quote,
//   marker: Marker,
//   checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
//   simpleImage: SimpleImage,
}