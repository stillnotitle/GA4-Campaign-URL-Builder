export interface FormValues {
  websiteUrl: string;
  source: 'app' | 'ads' | 'facebook' | 'google' | 'instagram' | 'line' | 'message' | 'newsletter' | 'qrcode' | 'signage' | 'smartnews' | 'twitter/x.com' | 'yahoo' | 'youtube' | 'other_source';
  medium: 'cpc' | 'cpv' | 'display' | 'email' | 'maps' | 'notification' | 'paid' | 'referral' | 'sms' | 'social' | 'video' | 'other_medium';
  campaignName: string;
  sourceOther: string;
  mediumOther: string;
  deliveryDate: Date | null;
  content: string;
}