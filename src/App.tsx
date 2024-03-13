import React, { useState, useRef } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import UrlGeneratorForm from './components/UrlGeneratorForm';
import { validateFormValues } from './utilities/validation';
import { generateUrl } from './utilities/urlGenerator';
import { FormValues } from './types';

function App() {
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const snackbarAnchorRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (formValues: FormValues) => {
    const errors = validateFormValues(formValues);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    const generatedUrl = generateUrl(formValues);
    setGeneratedUrl(generatedUrl);
  };

  const handleCopySuccess = () => {
    setShowSuccessSnackbar(true);
  };

  const handleCopyError = () => {
    setShowErrorSnackbar(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl)
      .then(handleCopySuccess)
      .catch(handleCopyError);
  };

  const handleCloseSnackbar = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          GA4URLパラメータービルダーα
        </Typography>
        <Typography variant="body1" gutterBottom>
          すべての*付きの項目を入力すると、キャンペーンURLが生成されます。
        </Typography>
      </Box>

      <UrlGeneratorForm onSubmit={handleFormSubmit} />

      {validationErrors.length > 0 && (
        <Box mb={2}>
          {validationErrors.map((error, index) => (
            <Typography key={index} color="error">
              {error}
            </Typography>
          ))}
        </Box>
      )}

      <div ref={snackbarAnchorRef}>
        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="URLをクリップボードにコピーしました"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
        <Snackbar
          open={showErrorSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="クリップボードへのコピーに失敗しました"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FileCopyIcon />}
        onClick={copyToClipboard}
        disabled={!generatedUrl}
      >
        コピー
      </Button>
    </Container>
  );
}

export default App;