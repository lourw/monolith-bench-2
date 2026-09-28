import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingDetailsPage } from './sizing-details-page';
import { SizingDetailsSummary } from './sizing-details-summary';
import {
  SIZING_DETAILS_FEATURE,
  SIZING_DETAILS_ROUTE,
} from './sizing-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_DETAILS_ROUTE]}>
      <SizingDetailsPage />
    </MemoryRouter>,
  );
}

describe('SizingDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<SizingDetailsSummary />);
    expect(
      screen.getByTestId(`${SIZING_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
