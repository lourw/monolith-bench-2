import { mathText } from '../../../utils/math/math-text';
import { CoreList } from '../../core/list/core-list';
import type { FeedbackTileProps } from './feedback-tile.types';
import { resolveFeedbackTileStyle } from './feedback-tile-variants';

export function FeedbackTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-tile',
  onSelect,
  children,
}: FeedbackTileProps) {
  const formatted = value === undefined ? '' : mathText(value);
  const style = resolveFeedbackTileStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-tile ui-element"
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

export default FeedbackTile;
