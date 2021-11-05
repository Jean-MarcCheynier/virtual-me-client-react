import React from 'react';
import { IInfo } from '@virtual-me/virtual-me-ts-core'
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
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
    {infos &&
      <Container className="py-3">
      <Row>
        <Col className="text-center">
          <Image src={`${process.env.PUBLIC_URL}/me.jpeg`} style={{width: '50vw', maxWidth: '250px'}} roundedCircle />
        </Col>
      </Row>
      <Row>
        <Col className="text-primary" xs={1}><FaInfo/></Col>
        <Col>
          <p>
            {`${infos.name}`}<br />
            {`${infos.surname}`}<br />
            {t('CV.bornIn')}: {new Intl.DateTimeFormat(lang).format(new Date(infos.dateOfBirth))}<br/>
            {t('CV.citizenship')}: <Translate translation={infos.citizenship.translation}/>
          </p>
        </Col>
      </Row>
      <Row>
        {infos.contact.map((item: IContact) => {   
            switch (item.type) {
              case ContactType.EMAIL:
                const contactEmail = item as IContactEmail;
                return <ContactEmail contact={contactEmail}/>;
              case ContactType.PHONE:
                const contactPhone = item as IContactPhone;
                return <ContactPhone contact={contactPhone} />;
              case ContactType.SOCIAL_NETWORK:
                const contactSN = item as IContactSocialNetwork;
                return <ContactSocialNetwork contact={contactSN} />;
              case ContactType.POST:
                const contactPost = item as IContactPost;
                return <ContactPost contact={contactPost} />;
              default:
                break;
            }
          }
          )}
      </Row>
    </Container>
    }
    </>;
  
  
}

const mapStateToProps = (state: any) => ({
  infos: state.cv?.list[0]?.infos,
  lang: state.preferences.lang
})

export default connect(mapStateToProps)(Info);