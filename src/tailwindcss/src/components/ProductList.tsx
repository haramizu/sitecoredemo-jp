import React from 'react';
import { ComponentParams, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface ProductField {
  id: string;
  jsonValue: JSON;
  name: string;
  value: string;
}
interface ProductProps {
  field: {
    id: string;
    jsonValue: JSON;
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
    let values = ``;

    for (const result of datasource.children.results) {
      for (const field of result.fields) {
        if (field.name === 'NavigationTitle') {
          values = values + `<p>` + field.value + `</p>`;
        }
      }
    }

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <ul>{values}</ul>
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
