import { FormValues } from '../types';

interface ValidationErrors {
  [key: string]: string;
}

export const validateFormValues = (formValues: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formValues.websiteUrl) {
    errors.websiteUrl = 'ウェブサイトのURLを入力してください。';
  } else if (!isValidUrl(formValues.websiteUrl)) {
    errors.websiteUrl = '有効なウェブサイトのURLを入力してください。';
  }

  if (!formValues.campaignName) {
    errors.campaignName = 'キャンペーン名を入力してください。';
  }

  if (formValues.source === 'other_source' && !formValues.sourceOther) {
    errors.sourceOther = '参照元を入力してください。';
  }

  if (formValues.medium === 'other_medium' && !formValues.mediumOther) {
    errors.mediumOther = 'メディアを入力してください。';
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
