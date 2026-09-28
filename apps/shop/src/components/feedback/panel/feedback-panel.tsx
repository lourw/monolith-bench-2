import { formatCurrency } from '../../../utils/format/format-currency';
import { i18nName } from '../../../utils/i18n/i18n-name';
import { collectionText } from '../../../utils/collection/collection-text';
import { CoreCard } from '../../core/card/core-card';
import type { FeedbackPanelProps } from './feedback-panel.types';
import { resolveFeedbackPanelStyle } from './feedback-panel-variants';

export function FeedbackPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-panel',
  onSelect,
  children,
}: FeedbackPanelProps) {
  const formatted = value === undefined ? '' : formatCurrency(value);
  const style = resolveFeedbackPanelStyle(tone, size);
  const ariaLabel = collectionText(i18nName(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-panel ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <CoreCard label="Core Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackPanel;
