import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { SettingsSection } from './SettingsSection';
import type { AppSettings } from '../../../shared/types';

interface DeploymentSettingsProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

/**
 * Deployment settings component for custom Claude deployment configuration
 * Allows users to configure custom endpoints, API keys, and deployment commands
 */
export function DeploymentSettings({ settings, onSettingsChange }: DeploymentSettingsProps) {
  const { t } = useTranslation('settings');
  const [showSensitive, setShowSensitive] = useState(false);

  const testDeployment = async () => {
    // TODO: Implement deployment testing logic
    alert('Deployment testing functionality will be implemented in the backend');
  };

  const resetToDefaults = () => {
    onSettingsChange({
      ...settings,
      customDeploymentBaseUrl: undefined,
      customDeploymentApiKey: undefined,
      maxOutputTokens: undefined,
      customDeploymentCommand: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title={t('deployment.title')}
        description={t('deployment.description')}
      >
        <div className="space-y-6">
          {/* Custom Base URL */}
          <div className="space-y-3">
            <Label htmlFor="customDeploymentBaseUrl" className="text-sm font-medium text-foreground">
              {t('deployment.baseUrlLabel')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('deployment.baseUrlDescription')}
            </p>
            <Input
              id="customDeploymentBaseUrl"
              placeholder="http://localhost:8082"
              className="w-full max-w-lg"
              value={settings.customDeploymentBaseUrl || ''}
              onChange={(e) => onSettingsChange({ ...settings, customDeploymentBaseUrl: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Example: <code className="bg-muted px-1 py-0.5 rounded">http://localhost:8082</code>
            </p>
          </div>

          {/* Custom API Key */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="customDeploymentApiKey" className="text-sm font-medium text-foreground">
                {t('deployment.apiKeyLabel')}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSensitive(!showSensitive)}
                className="h-6 px-2 text-xs"
              >
                {showSensitive ? t('deployment.hide') : t('deployment.show')}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('deployment.apiKeyDescription')}
            </p>
            <Input
              id="customDeploymentApiKey"
              type={showSensitive ? 'text' : 'password'}
              placeholder={showSensitive ? 'sk-ant-api01-...' : '••••••••••••••••'}
              className="w-full max-w-lg"
              value={settings.customDeploymentApiKey || ''}
              onChange={(e) => onSettingsChange({ ...settings, customDeploymentApiKey: e.target.value })}
            />
          </div>

          {/* Max Output Tokens */}
          <div className="space-y-3">
            <Label htmlFor="maxOutputTokens" className="text-sm font-medium text-foreground">
              {t('deployment.maxTokensLabel')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('deployment.maxTokensDescription')}
            </p>
            <Input
              id="maxOutputTokens"
              type="number"
              placeholder="128768"
              className="w-full max-w-lg"
              value={settings.maxOutputTokens || ''}
              onChange={(e) => onSettingsChange({
                ...settings,
                maxOutputTokens: e.target.value ? parseInt(e.target.value) : undefined
              })}
            />
            <p className="text-xs text-muted-foreground">
              {t('deployment.maxTokensDefault')}: <code className="bg-muted px-1 py-0.5 rounded">128768</code>
            </p>
          </div>

          {/* Custom Deployment Command */}
          <div className="space-y-3">
            <Label htmlFor="customDeploymentCommand" className="text-sm font-medium text-foreground">
              {t('deployment.commandLabel')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('deployment.commandDescription')}
            </p>
            <Textarea
              id="customDeploymentCommand"
              placeholder="ANTHROPIC_BASE_URL=http://localhost:8082 ANTHROPIC_API_KEY=pass CLAUDE_CODE_MAX_OUTPUT_TOKENS=128768 claude --dangerously-skip-permissions --verbose"
              className="w-full max-w-lg font-mono text-xs"
              rows={3}
              value={settings.customDeploymentCommand || ''}
              onChange={(e) => onSettingsChange({ ...settings, customDeploymentCommand: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              {t('deployment.commandNote')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={testDeployment}
              disabled={!settings.customDeploymentBaseUrl}
            >
              {t('deployment.testButton')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={resetToDefaults}
            >
              {t('deployment.resetButton')}
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* Info Box */}
      <SettingsSection>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
            {t('deployment.infoTitle')}
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {t('deployment.infoDescription')}
          </p>
          <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
            <li>ANTHROPIC_BASE_URL: {t('deployment.infoBaseUrl')}</li>
            <li>ANTHROPIC_API_KEY: {t('deployment.infoApiKey')}</li>
            <li>CLAUDE_CODE_MAX_OUTPUT_TOKENS: {t('deployment.infoMaxTokens')}</li>
          </ul>
        </div>
      </SettingsSection>
    </div>
  );
}