import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import French translations
import frCommon from './locales/fr/common.json';
import frInput from './locales/fr/input.json';
import frCycles from './locales/fr/cycles.json';
import frLeverage from './locales/fr/leverage.json';
import frResults from './locales/fr/results.json';
import frChart from './locales/fr/chart.json';
import frSettings from './locales/fr/settings.json';
import frTimeline from './locales/fr/timeline.json';
import frValidation from './locales/fr/validation.json';
import frTooltips from './locales/fr/tooltips.json';
import frMetrics from './locales/fr/metrics.json';

const resources = {
  fr: {
    translation: {
      ...frCommon,
      input: frInput,
      cycles: frCycles,
      leverage: frLeverage,
      results: frResults,
      chart: frChart,
      settings: frSettings,
      timeline: frTimeline,
      validation: frValidation,
      tooltips: frTooltips,
      metrics: frMetrics,
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;