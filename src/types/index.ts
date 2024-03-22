// FormValues型の定義
export type FormValues = {
  websiteUrl: string;
  source: 'newsletter' | 'line' | 'x.com' | 'facebook' | 'instagram' | 'youtube' | 'qrcode' | 'app' | 'message' | 'yahoo' | 'google' | 'ads' | 'signage' | 'news' | 'other_source' | '';
  medium: 'email' | 'social' | 'video' | 'maps' | 'life' | 'referral' | 'notification' | 'paid' | 'sms' | 'cpc' | 'cpv' | 'display' | 'other_medium' | '';
  campaignName: string;
  sourceOther: string;
  mediumOther: string;
  deliveryDate: Date | null;
  content: string;
};