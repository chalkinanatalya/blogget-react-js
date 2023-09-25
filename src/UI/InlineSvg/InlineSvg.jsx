import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const InlineSVG = ({src}) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    fetch(src)
      .then(response => response.text())
      .then(content => {
        setSvgContent(content);
      })
      .catch(error => {
        console.error('Ошибка при загрузке SVG:', error);
      });
  }, [src]);

  return (
    <div dangerouslySetInnerHTML={{__html: svgContent}} />
  );
};

InlineSVG.propTypes = {
  src: PropTypes.string,
};
