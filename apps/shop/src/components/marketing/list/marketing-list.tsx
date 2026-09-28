import { storageDate } from '../../../utils/storage/storage-date';
import type { MarketingListProps } from './marketing-list.types';
import { resolveMarketingListStyle } from './marketing-list-variants';

export function MarketingList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-list',
  onSelect,
  children,
}: MarketingListProps) {
  const formatted = value === undefined ? '' : storageDate(value);
  const style = resolveMarketingListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-list ui-element"
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
    </div>
  );
}

export default MarketingList;
