import React, {useState, useEffect} from "react";
import Task from './component/Task'
import {Center, Box, CheckboxGroup, Text} from '@chakra-ui/react'

const App = () => {
    const initialTask = [
        {
            name: "買い物",
            isDone: true,
        },
        {
            name: "ランニング",
            isDone: false,
        },
        {
            name: "プログラミングの勉強",
            isDone: false,
        },
    ];

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(initialTask);
    }, []);

    const toggleIsDone = (index) => {
        // Reactのルールとしてstateの値をsetState以外で更新してはいけない
        // そのため変数をコピーしておく
        const tasksCopy = [...tasks];
        // 現在のタスクの完了状況を取得して、定数に代入
        // Taskの情報は配列の中からindexをもとに取得
        const isDone = tasksCopy[index].isDone;
        tasksCopy[index].isDone = !isDone;
        setTasks(tasksCopy);
    };

    return (
        <Box mt="64px">
            <Center>
                <Box>
                    <Box mb="24px">
                        <Text fontSize="24px" fontWeight="bold">
                            タスク一覧
                        </Text>
                    </Box>
                    <CheckboxGroup>
                        {tasks.map((task, index) => {
                            return (
                                <Task
                                    key={index}
                                    index={index}
                                    name={task.name}
                                    isDone={task.isDone}
                                    toggleIsDone={toggleIsDone}
                                />
                            );
                        })}
                    </CheckboxGroup>
                </Box>
            </Center>
        </Box>
    );
};

export default App;
