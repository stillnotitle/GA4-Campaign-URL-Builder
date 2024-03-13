import React, { useState, useEffect } from 'react';
import { TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Box, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ja from 'date-fns/locale/ja/index.js';
import { generateUrl } from '../utilities/urlGenerator';
import { FormValues } from '../types';
import { format } from 'date-fns';

interface UrlGeneratorFormProps {
  onSubmit: (formValues: FormValues) => void;
}

const UrlGeneratorForm: React.FC<UrlGeneratorFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    websiteUrl: '',
    source: 'newsletter',
    medium: 'email',
    campaignName: '',
    sourceOther: '',
    mediumOther: '',
    deliveryDate: null,
    content: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');

  useEffect(() => {
    const url = generateUrl(formValues);
    setGeneratedUrl(url);
  }, [formValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handleChange = (field: keyof FormValues, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleDateChange = (newValue: Date | null) => {
    const formattedDate = newValue ? `${format(newValue, 'yyyyMMdd', { locale: ja })}_` : '';
    setFormValues((prevValues) => ({
      ...prevValues,
      deliveryDate: newValue,
      campaignName: formattedDate + prevValues.campaignName.replace(/^\d{8}_/, ''),
    }));
  };
  
  return (
    <Box component="form" mb={4} onSubmit={handleSubmit}>
      <TextField
        label="ウェブサイトのURL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.websiteUrl}
        onChange={(e) => handleChange('websiteUrl', e.target.value)}
        helperText="キャンペーンを実施するウェブサイトのURLを入力してください。"
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">参照元</FormLabel>
        <RadioGroup
          row
          value={formValues.source}
          onChange={(e) => handleChange('source', e.target.value)}
        >
          <FormControlLabel value="app" control={<Radio />} label="app" />
          <FormControlLabel value="ads" control={<Radio />} label="ads" />
          <FormControlLabel value="facebook" control={<Radio />} label="facebook" />
          <FormControlLabel value="google" control={<Radio />} label="google" />
          <FormControlLabel value="instagram" control={<Radio />} label="instagram" />
          <FormControlLabel value="line" control={<Radio />} label="line" />
          <FormControlLabel value="message" control={<Radio />} label="message" />
          <FormControlLabel value="newsletter" control={<Radio />} label="newsletter" />
          <FormControlLabel value="qrcode" control={<Radio />} label="qrcode" />
          <FormControlLabel value="signage" control={<Radio />} label="signage" />
          <FormControlLabel value="smartnews" control={<Radio />} label="smartnews" />
          <FormControlLabel value="twitter/x.com" control={<Radio />} label="twitter/x.com" />
          <FormControlLabel value="yahoo" control={<Radio />} label="yahoo" />
          <FormControlLabel value="youtube" control={<Radio />} label="youtube" />

          <FormControlLabel value="other_source" control={<Radio />} label="その他" />
        </RadioGroup>
        {formValues.source === 'other_source' && (
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.sourceOther}
            onChange={(e) => handleChange('sourceOther', e.target.value)}
            placeholder="参照元を入力"
          />
        )}
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">メディア</FormLabel>
        <RadioGroup
          row
          value={formValues.medium}
          onChange={(e) => handleChange('medium', e.target.value)}
        >
          <FormControlLabel value="cpc" control={<Radio />} label="cpc" />
          <FormControlLabel value="cpv" control={<Radio />} label="cpv" />
          <FormControlLabel value="display" control={<Radio />} label="display" />
          <FormControlLabel value="email" control={<Radio />} label="email" />
          <FormControlLabel value="maps" control={<Radio />} label="maps" />
          <FormControlLabel value="notification" control={<Radio />} label="notification" />
          <FormControlLabel value="paid" control={<Radio />} label="paid" />
          <FormControlLabel value="referral" control={<Radio />} label="referral" />
          <FormControlLabel value="sms" control={<Radio />} label="sms" />
          <FormControlLabel value="social" control={<Radio />} label="social" />
          <FormControlLabel value="video" control={<Radio />} label="video" />

          <FormControlLabel value="other_medium" control={<Radio />} label="その他" />
        </RadioGroup>
        {formValues.medium === 'other_medium' && (
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.mediumOther}
            onChange={(e) => handleChange('mediumOther', e.target.value)}
            placeholder="メディアを入力"
          />
        )}
      </FormControl>
      <Box display="flex" gap={2}>
        <TextField
          label="キャンペーン名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.campaignName}
          onChange={(e) => handleChange('campaignName', e.target.value)}
          helperText="キャンペーン名を入力してください。"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
          <DatePicker
            label="配信日から入力"
            value={formValues.deliveryDate}
            onChange={(newValue) => handleDateChange(newValue)}
            components={{
              OpenPickerIcon: CalendarIcon,
              TextField: (props) => (
                <TextField
                  {...props}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              ),
            }}
          />
        </LocalizationProvider>
      </Box>
      <TextField
        label="コンテンツ"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.content}
        onChange={(e) => handleChange('content', e.target.value)}
        helperText="コンテンツを区別するために使用します。"
      />
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          URLプレビュー
        </Typography>
        <Box
          p={2}
          border={1}
          borderColor="grey.300"
          borderRadius={4}
          bgcolor="grey.100"
        >
          <Typography variant="body1" style={{ overflowWrap: 'break-word' }}>
            {generatedUrl}
          </Typography>
        </Box>
      </Box>
  　</Box>
  );
};

export default UrlGeneratorForm;