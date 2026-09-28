import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURE_LINKS } from './feature-routes';

export function FeatureIndex() {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const map = new Map<string, typeof FEATURE_LINKS>();
    for (const link of FEATURE_LINKS) {
      if (needle && !link.title.toLowerCase().includes(needle)) {
        continue;
      }
      const bucket = map.get(link.domain) ?? [];
      map.set(link.domain, [...bucket, link]);
    }
    return Array.from(map.entries());
  }, [query]);

  return (
    <section className="feature-index" data-testid="feature-index">
      <header className="feature-header">
        <h1 className="feature-title">Features</h1>
        <input
          type="search"
          className="feature-input"
          placeholder="Filter features…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          data-testid="feature-index-filter"
        />
      </header>
      {grouped.map(([domain, links]) => (
        <section
          key={domain}
          className="feature-index-group"
          data-testid={`feature-index-${domain}`}
        >
          <h2 className="feature-index-domain">{domain}</h2>
          <ul className="feature-index-links">
            {links.map((link) => (
              <li key={link.id}>
                <Link to={link.route}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

export default FeatureIndex;
