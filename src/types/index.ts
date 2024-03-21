// FormValues型の定義
export interface FormValues {
  websiteUrl: string;
  source: string;
  medium: string;
  campaignName: string;
  sourceOther: string;
  mediumOther: string;
  deliveryDate: Date | null;
  content: string;
}