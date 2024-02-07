import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Trash from './../../assets/trash.svg?react';
import Arrow from './../../assets/up-down.svg?react';
import { Option } from "./Option";
import styles from './Select.module.css';

type SelectProps = {
    selected: string;
    options: string[];
    label: string;
    placeholder?: string;
    onChange: (selected: string) => void;
    onOptionDelete: () => void;
};

const Select = (props: SelectProps) => {
    const {
        label,
        options,
        placeholder,
        selected,
        onChange,
        onOptionDelete
    } = props;
    const [isOpen, setIsOpen] = useState(false); // состояние списка
    const [value, setValue] = useState(selected); // значение в инпуте
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
        onChange(selected);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                if (value !== '') {
                    onChange(value); // если при нажатии на Enter непустое значение, отправляем его родителю
                }
                else if (!isOpen) {
                    setIsOpen(true);
                }
                break;
            case 'Delete':
                options.length > 1 && onOptionDelete(); // удаление опции по нажатию на Del
                setValue('');
                break;
            default: break;
        }
    };

    const handleDeleteOption = () => {
        setValue('');
        onOptionDelete();
    };

    return (
        <div ref={rootRef}>
            <label htmlFor='optionInput'>
                {label}
                <div
                    className={styles.placeholder}
                    onClick={handlePlaceholderClick}
                    id={'placeholder'}
                >
                    <input
                        id={'optionInput'}
                        className={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChangeInput}
                        onKeyUp={handleKeyPress}
                    />
                    <div
                        className={styles.trash}
                        data-trash={!selected || options.length <= 1}
                        onClick={handleDeleteOption}
                    >
                        <Trash />
                    </div>
                    <div
                        className={styles.arrow}
                        data-visibility={!!options.length}
                        onClick={handlePlaceholderClick}
                    >
                        <Arrow />
                    </div>
                </div>
                {(isOpen && !!options.length) && (
                    <ul
                        id={'optionsList'}
                        className={styles.optionsList}
                    >
                        {options.map((option) => (
                            <Option
                                key={option}
                                option={option}
                                onOptionClick={handleChangeOption}
                                selected={option === selected}
                            />
                        ))}
                    </ul>
                )}
            </label>
        </div>
    );
};

export default Select;