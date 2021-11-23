import React from 'react';

const Presentation: React.FC<any> = (props) => {
  
  return <div className="my-5">
    <h1 className="text-primary">Virtual-me</h1>
    <p className="fs-4">
      Virtual-me n'est pas un portfolio. C'est un laboratoire, un support d'apprentissage, de veille technologique, et de communication.
    </p>
<<<<<<< Updated upstream
    <h2 className="text-primary">C'est aussi, </h2>
    <p className="fs-4">
      un chat, connecté, fullstack javascript, original, opensource, un cv, un délire, dynamique, une API, mulitlingue, responsive, accessible, amusant, critiquable, testable, sécurisé, dockerisé, sur Github, gratuit
=======
    <h2 className="text-primary">{t('presentation.title2')}</h2>
    <p className="fs-4 text-justify">
      {t('presentation.text2')}
>>>>>>> Stashed changes
    </p>
  </div>
}

export default Presentation;