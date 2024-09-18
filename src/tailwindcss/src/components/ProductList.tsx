import React from 'react';
import {
  ComponentParams,
  TextField,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ProductField {
  id: string;
  jsonValue: {
    value: string;
    editable: string;
  };
  name: string;
  value: string;
}
interface ProductProps {
  field: {
    id: string;
    jsonValue: {
      value: string;
      editable: string;
    };
    name: string;
    value: string;
  };
  fields: ProductField[];
}

interface Fields {
  data: {
    datasource: {
      field: {
        title: TextField;
      };
      children: {
        total: number;
        results: ProductProps[];
      };
    };
  };
}

interface ProductListProps {
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: ProductListProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const styles = `component product-list ${props.params.styles}`.trimEnd();

  const datasource = props.fields?.data?.datasource;

  if (datasource) {
    const children = ProductList(datasource.children.results);

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <>{children}</>
        </div>
      </div>
    );
  }

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>ProductList Component</p>
      </div>
    </div>
  );
};

const ProductList = (props: ProductProps[]) => {
  const children: JSX.Element[] = [];
  let titleContent: JSX.Element | null = null;
  let imageContent: JSX.Element | null = null;

  for (const product of props) {
    for (const field of product.fields) {
      if (field.name === 'NavigationTitle') {
        titleContent = <JssRichText field={field.jsonValue} />;
      }
      if (field.name === 'Image') {
        imageContent = <JssImage field={field.jsonValue} />;
      }
    }
    children.push(
      <div>
        {titleContent}
        {imageContent}
      </div>
    );
  }

  return <>{children}</>; // JSX エレメントを返す
};
