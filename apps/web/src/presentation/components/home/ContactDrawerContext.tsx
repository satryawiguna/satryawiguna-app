'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface ContactDrawerContextType {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ContactDrawerContext = createContext<ContactDrawerContextType>({
  open: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function useContactDrawer() {
  return useContext(ContactDrawerContext);
}

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactDrawerContext.Provider
      value={{
        open,
        openDrawer: () => setOpen(true),
        closeDrawer: () => setOpen(false),
      }}
    >
      {children}
    </ContactDrawerContext.Provider>
  );
}
