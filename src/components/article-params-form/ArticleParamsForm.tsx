import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	contentWidthArr,
	defaultArticleState,
	backgroundColors,
} from 'src/constants/articleProps';

import { Text } from 'src/ui/text/Text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select/Select';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type paramsProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: paramsProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectState, setSelectState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState({ ...selectState, [key]: value });
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState(selectState);
	};

	const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState(defaultArticleState);
		setSelectState(defaultArticleState);
	};

	useOutsideClickClose({
		isFormOpen,
		rootRef,
		onClose: () => setIsFormOpen(false),
		onChange: setIsFormOpen,
		event: 'mousedown',
	});

	return (
		<div>
			<ArrowButton onClick={setIsFormOpen} isOpen={isFormOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={selectState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Стиль шрифта'
					/>

					<RadioGroup
						name='fontSize'
						selected={selectState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='Размер шрифта'
					/>

					<Select
						selected={selectState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={selectState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						selected={selectState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
