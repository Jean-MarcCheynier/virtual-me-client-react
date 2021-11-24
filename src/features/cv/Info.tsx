import React from 'react';
import { IInfo } from '@virtual-me/virtual-me-ts-core'
import { connect } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import Translate from './Translate';
import { ContactType, IContact, IContactEmail, IContactPhone, IContactPost, IContactSocialNetwork} from '@virtual-me/virtual-me-ts-core/lib/Cv/Contact';
import { ContactEmail, ContactPhone, ContactPost, ContactSocialNetwork } from './Contact';
import { useTranslation } from 'react-i18next';
import { FaInfo } from 'react-icons/fa';

interface IInfoProps {
  infos: IInfo,
  lang: string
}

const Info: React.FC<IInfoProps> = (props: IInfoProps) => {
  
  const { infos, lang } = props;
  const [t] = useTranslation('common');
  
  return <>
    {infos && <>
      <Row>
        <Col className="text-center mt-3">
          <Image src={`${process.env.PUBLIC_URL}/me.jpeg`} style={{width: '50vw', maxWidth: '250px'}} roundedCircle />
        </Col>
      </Row>
      <Row>
        <Col className="text-primary" xs={1}><FaInfo/></Col>
        <Col>
          <p>
            {`${infos.name}`}<br />
            {`${infos.surname}`}<br />
            {t('CV.infos.bornIn')}: {new Intl.DateTimeFormat(lang).format(new Date(infos.dateOfBirth))}<br/>
            {t('CV.infos.citizenship')}: <Translate translation={infos.citizenship.translation}/>
          </p>
        </Col>
      </Row>
      <Row>
        {infos.contact.map((item: IContact, index: number) => {
            let el;
            switch (item.type) {
              case ContactType.EMAIL:
                const contactEmail = item as IContactEmail;
                el = <ContactEmail key={index} contact={contactEmail} />;
                break;
              case ContactType.PHONE:
                const contactPhone = item as IContactPhone;
                el = <ContactPhone key={index} contact={contactPhone} />;
                break;
              case ContactType.SOCIAL_NETWORK:
                const contactSN = item as IContactSocialNetwork;
                el = <ContactSocialNetwork key={index} contact={contactSN} />;
                break;
              case ContactType.POST:
                const contactPost = item as IContactPost;
                el = <ContactPost key={index} contact={contactPost} />;
                break;
              default:
                el = <React.Fragment key={index}></React.Fragment>
                break;
            }
            return el;
          })}
      </Row>
    </>
    }
    </>;
  
  
}

const mapStateToProps = (state: any) => ({
  infos: state.cv?.list[0]?.infos,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Info);