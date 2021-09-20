import React from 'react';
import './i18n.scss'

enum Display {
  INLINE= 'inline',
  BLOCK=  'block'
}

enum Lang {
  DEFAULT = 'default',
  EN = 'en',
  FR = 'fr'
}

type CSSI18nProps = {
  display?: string,
  content?: { [K in Lang]?: string | any },
  [x: string]: any
}

function CSSI18n(props: CSSI18nProps) {
  
  const { position = Display.INLINE, content, ...others } = props;
  
  if (content) {
    return (<div className={`d-${position}`}
      data-i18n={content[Lang.DEFAULT]}
      data-i18n-fr={content[Lang.FR]}
      data-i18n-en={content[Lang.EN]}
      {...others}
    />)
  } else {
    return null;
  }
}

export default CSSI18n;