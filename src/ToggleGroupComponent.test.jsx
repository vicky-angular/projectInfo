import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToggleGroupComponent from "../ToggleGroupComponent"; // Adjust the import path

describe("ToggleGroupComponent", () => {
  it("renders multiple toggle buttons", () => {
    render(<ToggleGroupComponent />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("allows selecting a button and deselecting others", () => {
    render(<ToggleGroupComponent />);

    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");

    // Click on Option 1
    fireEvent.click(option1);
    expect(option1).toHaveAttribute("aria-pressed", "true");
    expect(option2).toHaveAttribute("aria-pressed", "false");

    // Click on Option 2
    fireEvent.click(option2);
    expect(option2).toHaveAttribute("aria-pressed", "true");
    expect(option1).toHaveAttribute("aria-pressed", "false");
  });

  it("does not allow unselecting a selected button without selecting another", () => {
    render(<ToggleGroupComponent />);
    const option1 = screen.getByText("Option 1");

    fireEvent.click(option1);
    expect(option1).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(option1);
    expect(option1).toHaveAttribute("aria-pressed", "true"); // It remains selected
  });
});
