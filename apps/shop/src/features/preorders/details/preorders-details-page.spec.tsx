import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersDetailsPage } from './preorders-details-page';
import { PreordersDetailsSummary } from './preorders-details-summary';
import {
  PREORDERS_DETAILS_FEATURE,
  PREORDERS_DETAILS_ROUTE,
} from './preorders-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_DETAILS_ROUTE]}>
      <PreordersDetailsPage />
    </MemoryRouter>,
  );
}

describe('PreordersDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersDetailsSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
