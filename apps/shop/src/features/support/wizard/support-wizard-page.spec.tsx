import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportWizardPage } from './support-wizard-page';
import { SupportWizardSummary } from './support-wizard-summary';
import {
  SUPPORT_WIZARD_FEATURE,
  SUPPORT_WIZARD_ROUTE,
} from './support-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_WIZARD_ROUTE]}>
      <SupportWizardPage />
    </MemoryRouter>,
  );
}

describe('SupportWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportWizardSummary', () => {
  it('renders the summary block', () => {
    render(<SupportWizardSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
