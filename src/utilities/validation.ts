import { FormValues } from '../types';

export const validateFormValues = (formValues: FormValues): string[] => {
  const errors: string[] = [];

  if (!formValues.websiteUrl) {
    errors.push('ウェブサイトのURLを入力してください。');
  } else if (!isValidUrl(formValues.websiteUrl)) {
    errors.push('有効なウェブサイトのURLを入力してください。');
  }

  if (!formValues.campaignName) {
    errors.push('キャンペーン名を入力してください。');
  }

  if (formValues.source === 'other_source' && !formValues.sourceOther) {
    errors.push('参照元を入力してください。');
  }

  if (formValues.medium === 'other_medium' && !formValues.mediumOther) {
    errors.push('メディアを入力してください。');
  }

  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }
  return true;
};