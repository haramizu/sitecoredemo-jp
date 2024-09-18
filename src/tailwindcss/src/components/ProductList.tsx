import React from 'react';
import {
  ComponentParams,
  TextField,
  RichText as JssRichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ProductField {
  id: string;
  jsonValue: any;
  name: string;
  value: string;
}
interface ProductProps {
  field: {
    id: string;
    jsonValue: any;
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

  for (const product of props) {
    for (const field of product.fields) {
      if (field.name === 'NavigationTitle') {
        children.push(
          <div key={field.id}>
            {/* jsonValue を文字列として表示 */}
            <JssRichText field={field.jsonValue} />
          </div>
        );
      }
      if (field.name === 'Image') {
        children.push(
          <div key={field.id}>
            {/* jsonValue を文字列として表示 */}
            <JssImage field={field.jsonValue} />
          </div>
        );
      }
    }
  }

  return <>{children}</>; // JSX エレメントを返す
};
