import { MarketingBanner } from './marketing-banner';
import type {
  MarketingBannerGroupProps,
  MarketingBannerItem,
} from './marketing-banner.types';
import { toneFromValue } from './marketing-banner-variants';

export function MarketingBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-banner-group',
  onSelect,
}: MarketingBannerGroupProps) {
  const handleSelect = (item: MarketingBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingBanner
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default MarketingBannerGroup;
