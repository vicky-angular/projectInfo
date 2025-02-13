import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToggleButtonComponent from "../ToggleButtonComponent"; // Adjust the import path

describe("ToggleButtonComponent", () => {
  it("renders the toggle button", () => {
    render(<ToggleButtonComponent />);
    expect(screen.getByRole("button", { name: /toggle/i })).toBeInTheDocument();
  });

  it("toggles selection state on click", () => {
    render(<ToggleButtonComponent />);
    const toggleButton = screen.getByRole("button", { name: /toggle/i });

    // Initially not selected
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    // Click to select
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-pressed", "true");

    // Click again to deselect
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");
  });
});
