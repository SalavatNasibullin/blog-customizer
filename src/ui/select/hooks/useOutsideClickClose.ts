import { useEffect } from 'react';

type UseOutsideClickClose = {
	isFormOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	event?: 'click' | 'mousedown';
};

export const useOutsideClickClose = ({
	isFormOpen,
	rootRef,
	onClose,
	onChange,
	event = 'click',
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isFormOpen && onClose?.();
				onChange?.(false);
			}
		};

		if (!isFormOpen) return;

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isFormOpen, event]);
};
