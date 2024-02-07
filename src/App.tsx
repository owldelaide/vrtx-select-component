import { useState } from "react";
import Select from "./components/Select/Select";
import styles from './App.module.css';

let options: string[] = [
    // 'group_1',
    // 'group_2',
    // 'group_3',
    // 'group_4',
    // 'group_5',
];

const parentStyle = {
    width: '500px',
}

const App = () => {
    const [group, setGroup] = useState('');

    const handleGroupSelect = (value: string) => {
        setGroup(value);
        if (options.indexOf(value) === -1) // если нет такого элемента в массиве, добавляем
            options.push(value);
    };

    const handleDelete = () => {
        setGroup('');
        options = options.filter(item => item !== group);
    };

    return (
        <div
            style={parentStyle}
            className={styles.app}
        >
            <Select
                options={options}
                selected={group}
                onChange={handleGroupSelect}
                onOptionDelete={handleDelete}
                label={'Группа обработки'}
                placeholder={'Укажите название'}
            />
        </div>
    )
}

export default App;