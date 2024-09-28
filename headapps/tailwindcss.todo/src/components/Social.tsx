import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaRss } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TfiYoutube } from 'react-icons/tfi';

interface SocialLinkProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: SocialLinkProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component flex space-x-4 ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <FaFacebookF size={25} />
      </div>
      <div className="component-content">
        <TfiYoutube size={25} />
      </div>
      <div className="component-content">
        <FaXTwitter size={25} />
      </div>
      <div className="component-content">
        <FaLinkedinIn size={25} />
      </div>
      <div className="component-content">
        <FaRss size={25} />
      </div>
    </div>
  );
};
