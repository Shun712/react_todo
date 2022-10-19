import React, {useState, useEffect} from "react";
import Task from './component/Task'
import {Center, Box, CheckboxGroup, Text} from '@chakra-ui/react'
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = useState([]);

    // asyncで定義した関数内でawaitを使うことで、Promiseオブジェクトの終了を待たせられる
    // つまり、API通信の結果を待たせられる
    // 非同期処理を同期的に行わせないとエラーになる
    const fetch = async () => {
        const res = await axios.get("http://localhost:3010/tasks");
        setTasks(res.data);
    };

    useEffect(() => {
        fetch();
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
