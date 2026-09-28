import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareDetailsPage } from './compare-details-page';
import { CompareDetailsSummary } from './compare-details-summary';
import {
  COMPARE_DETAILS_FEATURE,
  COMPARE_DETAILS_ROUTE,
} from './compare-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_DETAILS_ROUTE]}>
      <CompareDetailsPage />
    </MemoryRouter>,
  );
}

describe('CompareDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${COMPARE_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<CompareDetailsSummary />);
    expect(
      screen.getByTestId(`${COMPARE_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
