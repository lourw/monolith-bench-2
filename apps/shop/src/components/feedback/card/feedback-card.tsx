import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import { mathText } from '../../../utils/math/math-text';
import { LayoutBanner } from '../../layout/banner/layout-banner';
import type { FeedbackCardProps } from './feedback-card.types';
import { resolveFeedbackCardStyle } from './feedback-card-variants';

export function FeedbackCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-card',
  onSelect,
  children,
}: FeedbackCardProps) {
  const formatted = value === undefined ? '' : i18nPhone(value);
  const style = resolveFeedbackCardStyle(tone, size);
  const ariaLabel = mathText(i18nCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-card ui-element"
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
      <LayoutBanner label="Layout Banner" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackCard;
