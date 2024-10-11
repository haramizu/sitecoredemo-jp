import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Ancestor {
  field: {
    value: string;
  };
  url: {
    path: string;
  };
}

interface Fields {
  data: {
    item: {
      ancestors: Ancestor[];
    };
  };
}

interface BreadcrumbProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: BreadcrumbProps): JSX.Element => {
  const data = props.fields?.data;
  const styles = `component breadcrumb ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  const { sitecoreContext } = useSitecoreContext();
  const locale = sitecoreContext.language || process.env.DEFAULT_LANGUAGE || 'en';

  if (data.item.ancestors.length > 0) {
    return (
      <>
        <div className="content breadcrumb m-4">
          {generateBreadcrumbList(data.item.ancestors, locale)}
        </div>
      </>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <div>Breadcrumb</div>
      </div>
    </div>
  );
};

function generateBreadcrumbList(ancestors: Ancestor[], locale: string): JSX.Element {
  // Reverse the ancestors array
  const reversedAncestors = ancestors.reverse();

  // check locale and create base Url
  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  const ancestorListItems = reversedAncestors.map((ancestor: Ancestor, index: number) => {
    return (
      <li key={index}>
        <a href={baseUrl + ancestor.url.path}>{ancestor.field.value}</a>
      </li>
    );
  });

  // Wrap the list items with ul tags and return the JSX element
  return <ul className="flex space-x-2">{ancestorListItems}</ul>;
}
