import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SizingWizardPage } from './sizing-wizard-page';
import { SizingWizardSummary } from './sizing-wizard-summary';
import {
  SIZING_WIZARD_FEATURE,
  SIZING_WIZARD_ROUTE,
} from './sizing-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SIZING_WIZARD_ROUTE]}>
      <SizingWizardPage />
    </MemoryRouter>,
  );
}

describe('SizingWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SIZING_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SIZING_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SIZING_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(SIZING_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SIZING_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SIZING_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SIZING_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SIZING_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SIZING_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SIZING_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SizingWizardSummary', () => {
  it('renders the summary block', () => {
    render(<SizingWizardSummary />);
    expect(
      screen.getByTestId(`${SIZING_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
