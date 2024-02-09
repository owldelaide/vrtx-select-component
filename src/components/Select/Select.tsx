import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Trash from './../../assets/trash.svg?react';
import Arrow from './../../assets/up-down.svg?react';
import { Option } from "./Option";
import styles from './Select.module.css';

type SelectProps = {
    options: string[];
    label: string;
};

const Select = (props: SelectProps) => {
    const {
        label,
        options,
    } = props;
    const [isOpen, setIsOpen] = useState(false); // состояние списка
    const [value, setValue] = useState(''); // значение в инпуте
    const [optionsList, setOptionsList] = useState(options); // локальная копия массива опций для манипуляций
    const rootRef = useRef<HTMLDivElement>(null); // ссылка на корневой див

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const { target } = e;
            if (target instanceof Node && !rootRef.current?.contains(target)) { // если кликаем вне корневого див и список открыт, он закроется
                setIsOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('keyup', handleEscape);

        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keyup', handleEscape);
        };
    }, [isOpen]);

    const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value); // меняем значение селекта при вводе в инпут
    };

    const handleChangeOption = (selected: string) => {
        setValue(selected);
    };

    const addOption = (selected: string) => {
        if (optionsList.indexOf(selected) === -1) // если нет такого элемента в массиве, добавляем
            setOptionsList([...optionsList, selected]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                if (value !== '') {
                    setValue(value);
                    addOption(value); // если при нажатии на Enter непустое значение, пробуем добавить в массив
                }
                else if (!isOpen) {
                    setIsOpen(true);
                }
                break;
            case 'Delete':
                optionsList.length > 1 && handleDeleteOption(); // удаление опции по нажатию на Del
                break;
            default: break;
        }
    };

    const handleDeleteOption = () => {
        setOptionsList(optionsList.filter(item => item !== value));
        setValue('');
    };

    return (
        <div
            ref={rootRef}
            className={styles.wrapper}
        >
            <label>
                {label}
                <div
                    className={styles.placeholder}
                    onClick={handlePlaceholderClick}
                    id={'placeholder'}
                >
                    <input
                        className={styles.input}
                        placeholder={'Укажите название'}
                        value={value}
                        onChange={handleChangeInput}
                        onKeyDown={handleKeyPress}
                    />
                    <div
                        className={styles.trash}
                        data-trash={!value || optionsList.length <= 1}
                        onClick={handleDeleteOption}
                    >
                        <Trash />
                    </div>
                    <div
                        className={styles.arrow}
                        data-visibility={!!optionsList.length}
                        onClick={handlePlaceholderClick}
                    >
                        <Arrow />
                    </div>
                </div>
                {(isOpen && !!optionsList.length) && (
                    <ul
                        id={'optionsList'}
                        className={styles.optionsList}
                    >
                        {optionsList.map((option) => (
                            <Option
                                key={option}
                                option={option}
                                onOptionClick={handleChangeOption}
                                selected={option === value}
                            />
                        ))}
                    </ul>
                )}
            </label>
        </div>
    );
};

export default Select;