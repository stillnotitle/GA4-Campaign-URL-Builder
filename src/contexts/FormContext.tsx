import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Help as HelpIcon,
  FileCopy as FileCopyIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ja from "date-fns/locale/ja/index.js";
import { generateUrl } from "../utilities/urlGenerator";
import { useForm } from "../hooks/useForm"; // useFormカスタムフックをインポート
import { FormValues } from "../types"; // FormValues型をインポート
import { format } from "date-fns";

interface UrlGeneratorFormProps {
  onSubmit: (formValues: FormValues) => void;
  validationErrors: Record<string, string>;
}

const UrlGeneratorForm: React.FC<UrlGeneratorFormProps> = ({
  onSubmit,
  validationErrors,
}) => {
  const { formValues, handleChange, handleSubmit } = useForm(); // useFormから状態と関数を取得
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const requiredFields = ["websiteUrl", "source", "medium", "campaignName"];
    const isAllRequiredFieldsFilled = requiredFields.every(
      (field) => formValues[field as keyof FormValues],
    );

    if (isAllRequiredFieldsFilled) {
      const url = generateUrl(formValues);
      setGeneratedUrl(url);
      setShowPreview(true);
    } else {
      setGeneratedUrl("");
      setShowPreview(false);
    }
  }, [formValues]);

  // フォーム送信時の処理をカスタムフックのhandleSubmitに置き換える
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e); // カスタムフックの送信処理を呼び出す
    onSubmit(formValues); // 親コンポーネントへの送信処理
  };

  const handleDateChange = (newValue: Date | null) => {
    const formattedDate = newValue
      ? format(newValue, "yyyyMMdd", { locale: ja }) + "_"
      : "";
    handleChange("deliveryDate", newValue);
    handleChange(
      "campaignName",
      formattedDate + formValues.campaignName.split("_").pop(),
    );
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedUrl);
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <Box component="form" mb={4} onSubmit={handleFormSubmit}>
      <Box display="flex" alignItems="center">
        <FormLabel component="legend">ウェブサイトのURL*</FormLabel>
        <Tooltip title="計測を実施するウェブサイトのURLを入力してください。">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center">
        <TextField
          label="ウェブサイトのURL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.websiteUrl}
          onChange={(e) => handleChange("websiteUrl", e.target.value)}
          error={!!validationErrors.websiteUrl}
          helperText={validationErrors.websiteUrl}
        />
      </Box>
      <FormControl component="fieldset" margin="normal">
        <Box display="flex" alignItems="center">
          <FormLabel component="legend">配信元*</FormLabel>
          <Tooltip title="URLを配信する経路を選択してください。">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <RadioGroup
          row
          value={formValues.source}
          onChange={(e) => handleChange("source", e.target.value)}
        >
          <FormControlLabel
            value="newsletter"
            control={<Radio />}
            label="メルマガ"
          />
          <FormControlLabel value="line" control={<Radio />} label="LINE" />
          <FormControlLabel
            value="x.com"
            control={<Radio />}
            label="twitter/x.com"
          />
          <FormControlLabel
            value="facebook"
            control={<Radio />}
            label="facebook"
          />
          <FormControlLabel
            value="instagram"
            control={<Radio />}
            label="Instagram"
          />
          <FormControlLabel
            value="youtube"
            control={<Radio />}
            label="YouTube"
          />
          <FormControlLabel
            value="qrcode"
            control={<Radio />}
            label="QRコード"
          />
          <FormControlLabel value="app" control={<Radio />} label="アプリ" />
          <FormControlLabel
            value="message"
            control={<Radio />}
            label="ショートメール"
          />
          <FormControlLabel value="yahoo" control={<Radio />} label="ヤフー" />
          <FormControlLabel value="google" control={<Radio />} label="Google" />
          <FormControlLabel value="ads" control={<Radio />} label="広告" />
          <FormControlLabel
            value="signage"
            control={<Radio />}
            label="サイネージ"
          />
          <FormControlLabel
            value="news"
            control={<Radio />}
            label="ニュースサイト"
          />
          <FormControlLabel
            value="other_source"
            control={<Radio />}
            label="その他"
          />
        </RadioGroup>
        {formValues.source === "other_source" && (
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.sourceOther}
            onChange={(e) => handleChange("sourceOther", e.target.value)}
            placeholder="配信元を入力（英数小文字）"
            error={!!validationErrors.sourceOther}
            helperText={validationErrors.sourceOther}
          />
        )}
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <Box display="flex" alignItems="center">
          <FormLabel component="legend">メディア種別*</FormLabel>
          <Tooltip title="メディアの種類を選択してください。">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <RadioGroup
          row
          value={formValues.medium}
          onChange={(e) => handleChange("medium", e.target.value)}
        >
          <FormControlLabel value="email" control={<Radio />} label="メール" />
          <FormControlLabel
            value="social"
            control={<Radio />}
            label="ソーシャルメディア"
          />
          <FormControlLabel value="video" control={<Radio />} label="動画" />
          <FormControlLabel value="maps" control={<Radio />} label="マップ" />
          <FormControlLabel
            value="life"
            control={<Radio />}
            label="くらし情報"
          />
          <FormControlLabel
            value="referral"
            control={<Radio />}
            label="メディア紹介"
          />
          <FormControlLabel
            value="notification"
            control={<Radio />}
            label="スマホ通知"
          />
          <FormControlLabel
            value="paid"
            control={<Radio />}
            label="その他広告"
          />
          <FormControlLabel value="sms" control={<Radio />} label="SMS" />
          <FormControlLabel
            value="cpc"
            control={<Radio />}
            label="クリック型"
          />
          <FormControlLabel
            value="cpv"
            control={<Radio />}
            label="広告視聴型"
          />
          <FormControlLabel
            value="display"
            control={<Radio />}
            label="バナー"
          />
          <FormControlLabel
            value="other_medium"
            control={<Radio />}
            label="その他"
          />
        </RadioGroup>
        {formValues.medium === "other_medium" && (
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.mediumOther}
            onChange={(e) => handleChange("mediumOther", e.target.value)}
            placeholder="メディア種別を入力（英数小文字）"
            error={!!validationErrors.mediumOther}
            helperText={validationErrors.mediumOther}
          />
        )}
      </FormControl>
      <Box display="flex" alignItems="center">
        <FormLabel component="legend">キャンペーン名*</FormLabel>
        <Tooltip title="キャンペーン名を作成してください。配信日の挿入もできます。利用できるのは英数小文字とアンダースコアとハイフンのみです。">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
          <DatePicker
            label="配信日から入力"
            value={formValues.deliveryDate}
            onChange={handleDateChange}
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
        <TextField
          label="キャンペーン名を作成"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.campaignName}
          onChange={(e) => handleChange("campaignName", e.target.value)}
          error={!!validationErrors.campaignName}
          helperText={validationErrors.campaignName}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <FormLabel component="legend">コンテンツ ＜オプション＞</FormLabel>
        <Tooltip title="URLをコンテンツ毎に区別したい場合に使用してください。（例：トップコンテンツ用なら「top」など）">
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        label="コンテンツ"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formValues.content}
        onChange={(e) => handleChange("content", e.target.value)}
      />
      <Box mb={2}>
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
          {showPreview ? (
            <Typography variant="body1" style={{ overflowWrap: "break-word" }}>
              {generatedUrl}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              必須項目を入力するとURLが表示されます。
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FileCopyIcon />}
        onClick={copyToClipboard}
        disabled={!generatedUrl}
      >
        コピー
      </Button>
    </Box>
  );
};

export default UrlGeneratorForm;
