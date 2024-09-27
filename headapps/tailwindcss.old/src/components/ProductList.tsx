import React from 'react';
import {
  ComponentParams,
  TextField,
  Text,
  Image,
  SitecoreContextValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

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
  url: {
    path: string;
    siteName: string;
  };
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

const getLocale = function (props: SitecoreContextValue): string {
  let locale;

  if (!props.language || props.language === process.env.DEFAULT_LANGUAGE) {
    locale = '';
  } else {
    locale = '/' + props.language;
  }

  return locale;
};

export const Default = (props: ProductListProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const styles = `component product-list ${props.params.styles}`.trimEnd();
  const { sitecoreContext } = useSitecoreContext();

  const contentLocale = getLocale(sitecoreContext);

  const datasource = props.fields?.data?.datasource;

  if (datasource) {
    const children = ProductList(datasource.children.results, contentLocale);

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <>{children}</>
            </div>
          </div>
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

const ProductList = (props: ProductProps[], locale: string) => {
  const children: JSX.Element[] = [];
  let titleContent: JSX.Element | null = null;
  let imageContent: JSX.Element | null = null;

  for (const product of props) {
    for (const field of product.fields) {
      if (field.name === 'NavigationTitle') {
        titleContent = <Text field={field.jsonValue} />;
      }
      if (field.name === 'CoverImage') {
        imageContent = <Image field={field.jsonValue} className="w-full h-full object-contain" />;
      }
    }
    children.push(
      <div className="card border rounded shadow min-h-[330px]">
        <div className="aspect-w-16 aspect-h-9">{imageContent}</div>
        <div className="ml-8 mr-8 mt-5 text-xl mb-5">
          <Link href={locale + product.url.path}>{titleContent}</Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
