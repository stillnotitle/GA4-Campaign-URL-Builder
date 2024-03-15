import { FormValues } from '../types';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja/index.js';

const formatDate = (date: Date | null): string => {
  return date ? format(date, 'yyyyMMdd', { locale: ja }) : '';
};

export const generateUrl = (formValues: FormValues): string => {
  const params = new URLSearchParams({
    utm_source: encodeURIComponent(formValues.source === 'other_source' ? formValues.sourceOther : formValues.source),
    utm_medium: encodeURIComponent(formValues.medium === 'other_medium' ? formValues.mediumOther : formValues.medium),
    utm_campaign: formValues.campaignName ? encodeURIComponent(formValues.campaignName) : '',
    ...(formValues.content ? { utm_content: encodeURIComponent(formValues.content) } : {}),
  }).toString();

  return `${formValues.websiteUrl}?${params}`;
};