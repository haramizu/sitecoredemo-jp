import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import PreviewSearch from '@/widgets/PreviewSearch';

interface PreviewSearchProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: PreviewSearchProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component flex justify-center items-center h-[100px]`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <p>
          <PreviewSearch rfkId="rfkid_6"></PreviewSearch>
        </p>
      </div>
    </div>
  );
};
