
import React from 'react'
import * as DOMPurify from 'isomorphic-dompurify';
type Props = {
  content : string;
  className : string;
}
const SanitizedContent = (props:Props) => {
  const cleanHtml =DOMPurify.default.sanitize(props.content)
    return (
    <div  className={props.className} dangerouslySetInnerHTML={{__html:cleanHtml}}/>
  )
}

export default SanitizedContent