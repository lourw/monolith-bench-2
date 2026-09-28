import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportOverviewPage } from './support-overview-page';
import { SupportOverviewSummary } from './support-overview-summary';
import {
  SUPPORT_OVERVIEW_FEATURE,
  SUPPORT_OVERVIEW_ROUTE,
} from './support-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_OVERVIEW_ROUTE]}>
      <SupportOverviewPage />
    </MemoryRouter>,
  );
}

describe('SupportOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUPPORT_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<SupportOverviewSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
