import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import UrlGeneratorForm from './components/UrlGeneratorForm';
import { validateFormValues } from './utilities/validation';
import { generateUrl } from './utilities/urlGenerator';
import { FormValues } from './types';

function App() {
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = (formValues: FormValues) => {
    console.log('Form submitted with values:', formValues);
    const errors = validateFormValues(formValues);

    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    const generatedUrl = generateUrl(formValues);
    console.log('Generated URL:', generatedUrl);
    setGeneratedUrl(generatedUrl);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          &#128221;GA4 URLジェネレーター
        </Typography>
        <Typography variant="body1" gutterBottom>
          すべての*付きの必須項目を入力すると、GAで分析が出来るパラメーター付きURLがかんたんに生成できます。
        </Typography>
      </Box>

      <UrlGeneratorForm
        onSubmit={handleFormSubmit}
        validationErrors={validationErrors}
        generatedUrl={generatedUrl}
      />
    </Container>
  );
}

export default App;