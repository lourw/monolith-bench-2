import { storageCurrency } from '../../../utils/storage/storage-currency';
import { CoreList } from '../../core/list/core-list';
import type { FeedbackToolbarProps } from './feedback-toolbar.types';
import { resolveFeedbackToolbarStyle } from './feedback-toolbar-variants';

export function FeedbackToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-toolbar',
  onSelect,
  children,
}: FeedbackToolbarProps) {
  const formatted = value === undefined ? '' : storageCurrency(value);
  const style = resolveFeedbackToolbarStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-toolbar ui-element"
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
      <CoreList label="Core List" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackToolbar;
