import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsDetailsPage } from './returns-details-page';
import { ReturnsDetailsSummary } from './returns-details-summary';
import {
  RETURNS_DETAILS_FEATURE,
  RETURNS_DETAILS_ROUTE,
} from './returns-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_DETAILS_ROUTE]}>
      <ReturnsDetailsPage />
    </MemoryRouter>,
  );
}

describe('ReturnsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${RETURNS_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsDetailsSummary />);
    expect(
      screen.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
