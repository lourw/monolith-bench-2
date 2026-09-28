import { collectionDate } from '../../../utils/collection/collection-date';
import { FeedbackPanel } from '../../feedback/panel/feedback-panel';
import type { MarketingHeaderProps } from './marketing-header.types';
import { resolveMarketingHeaderStyle } from './marketing-header-variants';

export function MarketingHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-header',
  onSelect,
  children,
}: MarketingHeaderProps) {
  const formatted = value === undefined ? '' : collectionDate(value);
  const style = resolveMarketingHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-header ui-element"
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
      <FeedbackPanel
        label="Feedback Panel"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default MarketingHeader;
