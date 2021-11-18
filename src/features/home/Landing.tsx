import React from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import CSSI18n from '../../components/I18N/CSSI18n';
import { TypeWriterBlock, TypeWriterContainer } from '../../components/typeWriter/TypeWriter';

function Landing() {
  const history = useHistory();
  const {lang} = useParams<{lang: string}>();
  
  useEffect(() => {
    const onKeyDownListener = (e: any) => {
      history.push(`/${lang}/chat`)
    }
    setTimeout(() => {
      document.addEventListener('keydown', onKeyDownListener);
      document.addEventListener('click', onKeyDownListener);
    }, 15000);

    return () => {
      document.removeEventListener('keydown', onKeyDownListener);
      document.removeEventListener('click', onKeyDownListener);
    }
  }, [history, lang]);
  
  return <Container>
    <TypeWriterContainer className='text-primary'>
      <TypeWriterBlock className="type-writer type-writer-1">
        <CSSI18n className="h3 type-writer-1" content={{ default: "Je ne suis pas\u00A0", en: "I am not\u00A0" }}/>
      </TypeWriterBlock>
      <br/>
      <TypeWriterBlock className="type-writer type-writer-2">
        <CSSI18n className="h3 type-writer-2" content={{ default: "un profil LinkedIn.\u00A0", en: "a LinkedIn profile\u00A0" }} />
      </TypeWriterBlock>
      <br />
      <TypeWriterBlock className="type-writer type-writer-3">
        <CSSI18n className="h3 type-writer-3" content={{ default: "Et toi,\u00A0", en: "And you\u00A0" }} />
      </TypeWriterBlock>
      <br />
      <TypeWriterBlock className="type-writer type-writer-4">
        <CSSI18n className="h3 type-writer-4" content={{ default: "qui es-tu?\u00A0", en: "Who are you?\u00A0" }} />
      </TypeWriterBlock>
    </TypeWriterContainer>
{/*     <div className="enter">
        <a className="centered" data-i18n="Viens!" data-i18n-en="Home"></a>
    </div> */}
  </Container>
  
}

export default Landing;
