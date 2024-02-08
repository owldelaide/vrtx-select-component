import { useState } from "react";
import styles from './App.module.css';
import Select from "./components/Select/Select";

let options: string[] = [
    'options1_group_1',
    'options1_group_2',
    'options1_group_3',
];

let options2: string[] = [
    'options2_group_1',
    'options2_group_2',
    'options2_group_3',
];

let options3: string[] = [
    'options3_group_1',
    'options3_group_2',
    'options3_group_3',
];

const parentStyle = {
    width: '500px',
};

const initialState = {
    group: '',
    group2: '',
    group3: ''
};

const App = () => {
    const [state, setState] = useState(initialState);

    // новые обработчики
    const addOption = (options: string[], value: string) => {
        if (options.indexOf(value) === -1) // если нет такого элемента в массиве, добавляем
            options.push(value);
    };

    const deleteOption = (options: string[], value: string) => {
        let index = options.findIndex(item => item === value)
        options.splice(index, 1);
    };

    // старые обработчики
    // const handleGroupSelect = (value: string) => {
    //     setGroup(value);
    //     if (options.indexOf(value) === -1) // если нет такого элемента в массиве, добавляем
    //         options.push(value);
    // };

    // const handleDelete = () => {
    //     setGroup('');
    //     options = options.filter(item => item !== group);
    // };

    return (
        <div
            style={parentStyle}
            className={styles.app}
        >
            <Select
                fieldName={'select'}
                options={options}
                selected={state.group}
                onChange={value => { setState({ ...state, group: value }), addOption(options, value) }}
                onOptionDelete={() => { setState({ ...state, group: '' }), deleteOption(options, state.group) }}
                label={'Группа обработки'}
                placeholder={'Укажите название'}
            />
            <Select
                fieldName={'select2'}
                options={options2}
                selected={state.group2}
                onChange={value => { setState({ ...state, group2: value }), addOption(options2, value) }}
                onOptionDelete={() => { setState({ ...state, group2: '' }), deleteOption(options2, state.group2) }}
                label={'Группа обработки 2'}
                placeholder={'Укажите название'}
            />
            <Select
                fieldName={'select3'}
                options={options3}
                selected={state.group3}
                onChange={value => { setState({ ...state, group3: value }), addOption(options3, value) }}
                onOptionDelete={() => { setState({ ...state, group3: '' }), deleteOption(options3, state.group3) }}
                label={'Группа обработки 3'}
                placeholder={'Укажите название'}
            />
        </div>
    )
}

export default App;