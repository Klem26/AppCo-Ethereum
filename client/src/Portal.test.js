import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  });

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

describe("Portal", () => {
  test("modal show", () => {
    const handelClose = jest.fn();
    render(
      <Modal onClose={handelClose}>
        <div> My Portal</div>
      </Modal>
    );
    expect(screen.getByText("My Portal")).toBeInTheDocument();
    userEvent.click(screen.getByText(/close/i));
    expect(handelClose).toHaveBeenCalledTimes(1);
  });

  test("should be unmounted", () => {
    const { unmount } = render(
      <Modal>
        <div> My Portal</div>
      </Modal>
    );
    expect(screen.getByText("My Portal")).toBeInTheDocument();
    unmount();
    expect(screen.queryByText("My Portal")).not.toBeInTheDocument();
  });
});
