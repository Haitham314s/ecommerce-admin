"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./Dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, description, isOpen, onClose, children }: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <DialogDescription>{description}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
