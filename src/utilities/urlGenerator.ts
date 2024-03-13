import { FormValues } from '../types';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja/index.js';

export const generateUrl = (formValues: FormValues): string => {
  const params = new URLSearchParams({
    utm_source: formValues.source === 'other_source' ? formValues.sourceOther : formValues.source,
    utm_medium: formValues.medium === 'other_medium' ? formValues.mediumOther : formValues.medium,
    ...(formValues.deliveryDate && formValues.campaignName
      ? { utm_campaign: `${formValues.campaignName}_${format(formValues.deliveryDate, 'yyyyMMdd')}` }
      : formValues.campaignName
        ? { utm_campaign: formValues.campaignName }
        : {}),
    ...(formValues.content ? { utm_content: formValues.content } : {}),
  }).toString();

  return `${formValues.websiteUrl}?${params}`;
};