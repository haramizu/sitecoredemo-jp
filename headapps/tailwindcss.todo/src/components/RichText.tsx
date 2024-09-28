import React from 'react';
import {
  Field,
  RichText as JssRichText,
  SitecoreContextValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type RichTextValue = {
  value: string;
};

const getLocale = function (props: SitecoreContextValue): string {
  let locale;

  if (!props.language || props.language === process.env.DEFAULT_LANGUAGE) {
    locale = '';
  } else {
    locale = '/' + props.language;
  }

  return locale;
};

const addLocaleToUrls = (json: RichTextValue, locale: string): RichTextValue => {
  const urlRegex = /href="\/(?!\/)([^"]*)"/g;
  const updatedValue = json.value.replace(urlRegex, (_, url) => {
    return `href="${locale}/${url}"`;
  });

  return { value: updatedValue };
};

export const Default = (props: RichTextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const contentLocale = getLocale(sitecoreContext);
  const updatedJsonData = addLocaleToUrls(props.fields.Text, contentLocale);

  const text = props.fields ? (
    <JssRichText field={updatedJsonData} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">{text}</div>
    </div>
  );
};
