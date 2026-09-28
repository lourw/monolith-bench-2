import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersOverviewPage } from './preorders-overview-page';
import { PreordersOverviewSummary } from './preorders-overview-summary';
import {
  PREORDERS_OVERVIEW_FEATURE,
  PREORDERS_OVERVIEW_ROUTE,
} from './preorders-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_OVERVIEW_ROUTE]}>
      <PreordersOverviewPage />
    </MemoryRouter>,
  );
}

describe('PreordersOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersOverviewSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
