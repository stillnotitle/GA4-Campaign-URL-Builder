import { useState, useCallback } from 'react';
import { FormValues } from '../types';

// バリデーション関数
const validateForm = (values: FormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  // URL形式のバリデーション
  if (!values.websiteUrl) {
    errors.websiteUrl = 'ウェブサイトのURLを入力してください。';
  } else if (!/^(https?:\/\/)?[\da-z\.-]+\.[a-z\.]{2,6}[\/\w \.-]*\/?$/.test(values.websiteUrl)) {
    errors.websiteUrl = '有効なURLを入力してください。';
  }

  // キャンペーン名のバリデーション（英数小文字、アンダースコア、ハイフンのみ）
  if (!values.campaignName) {
    errors.campaignName = 'キャンペーン名を入力してください。';
  } else if (!/^[a-z0-9_-]+$/.test(values.campaignName)) {
    errors.campaignName = 'キャンペーン名は英数小文字、アンダースコア、ハイフンのみ使用できます。';
  }

  // コンテンツのバリデーション（英数小文字、アンダースコア、ハイフンのみ）
  if (values.content && !/^[a-z0-9_-]+$/.test(values.content)) {
    errors.content = 'コンテンツは英数小文字、アンダースコア、ハイフンのみ使用できます。';
  }

  return errors;
};

export const useForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    websiteUrl: '',
    source: '' as FormValues['source'],
    medium: '' as FormValues['medium'],
    campaignName: '',
    sourceOther: '',
    mediumOther: '',
    deliveryDate: null,
    content: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((field: keyof FormValues, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    // 値が変更されたらバリデーションを実行
    const newErrors = validateForm({ ...formValues, [field]: value });
    setErrors(newErrors);
  }, [formValues]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validateForm(formValues);
    if (Object.keys(newErrors).length === 0) {
      // エラーがなければ送信処理を実行
      // 送信処理...
    } else {
      // エラーがあれば状態を更新
      setErrors(newErrors);
    }
  }, [formValues]);

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
  };
};