import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
// import SearchResults from '@/widgets/SearchResults';
// import { useRouter } from 'next/router';

interface SearchResultsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: SearchResultsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  // const router = useRouter();
  // const { q } = router.query; // Query string から 'q' を取得
  // const query = Array.isArray(q) ? q[0] : q;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        Search Results
        {/* <SearchResults key={`${query}-search`} rfkId="rfkid_7" defaultKeyphrase={query} /> */}
      </div>
    </div>
  );
};
