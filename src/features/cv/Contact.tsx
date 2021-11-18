import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IContactEmail, IContactPhone, IContactPost, IContactSocialNetwork, SocialNetwork } from '@virtual-me/virtual-me-ts-core/lib/Cv/Contact';
import { FaMobile } from 'react-icons/fa';
import Translate from './Translate';

const SNIcons: Record<SocialNetwork, JSX.Element> = {
  [SocialNetwork.FACEBOOK]: <FaFacebook />,
  [SocialNetwork.GITHUB]: <FaGithub />,
  [SocialNetwork.LINKEDIN]: <FaLinkedin />
}

export const ContactEmail: React.FC<{ contact: IContactEmail }> = ({ contact }) => {
  return (<dl className="row my-0">
    <dt className="col-1 text-primary">
      <FaEnvelope />
    </dt>
    <dd className="col">
      <a href={`mailto:${contact.email}?subject=Contact from virtual-me`}>
        {contact.email}
      </a>
    </dd>
  </dl>);
}
  
export const ContactPhone: React.FC<{ contact: IContactPhone }> = ({ contact }) => {
  return (<dl className="row my-0">
      <dt className="col-1 text-primary">
        <FaMobile />
      </dt>
    <dd className="col">
      <a href={`tel:${contact.countryCode}${contact.number}`}>
        {`(${contact.countryCode}) ${contact.number}`}
      </a>
    </dd>
  </dl>);
}
    
export const ContactSocialNetwork: React.FC<{ contact: IContactSocialNetwork }> = ({ contact }) => {
  const icon: JSX.Element = SNIcons[contact.networkName]
  return (<dl className="row my-0">
    <dt className="col-1 text-primary">
      {icon}
    </dt>
    <dd className="col">
      <a href={contact.profile}>
        <Translate translation={contact.name.translation} />
      </a>
    </dd>
  </dl>);
}
  
export const ContactPost: React.FC<{ contact: IContactPost }> = ({ contact }) => {
  return (<dl className="row my-0">
    <dt className="col-1 text-primary">
      <FaEnvelope />
    </dt>
    <dd className="col">
      <address>
        {contact.line1}<br/>
        {contact.line2 && <><div>{contact.line2}</div><br/></>}
        {contact.zipCode}<br/>
        {contact.city}<br/>
        {contact.country}<br/>
      </address>
    </dd>
  </dl>);
}
