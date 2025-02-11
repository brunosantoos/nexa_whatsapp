import { Transition } from '@headlessui/react';

export function Animated({
  show,
  children,
}: {
  show: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <Transition
      show={show || false}
      enter="transform transition-all duration-700"
      enterFrom="opacity-0 -translate-y-2"
      enterTo="opacity-100"
      leave="transform transition-all duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 translate-y-2"
    >
      {children}
    </Transition>
  );
}
