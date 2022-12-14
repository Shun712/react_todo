import React, {useState, useEffect} from "react";
import Task from './component/Task'
import {Flex, Input, Button, Center, Box, CheckboxGroup, Text} from '@chakra-ui/react'
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");

    // asyncで定義した関数内でawaitを使うことで、Promiseオブジェクトの終了を待たせられる
    // つまり、API通信の結果を待たせられる
    // 非同期処理を同期的に行わせないとエラーになる
    const fetch = async () => {
        const res = await axios.get("http://localhost:3010/tasks");
        setTasks(res.data);
    };

    const createTask = async () => {
        await axios.post("http://localhost:3010/tasks", {
            name: name,
            is_done: false,
        });
        setName("");
        fetch();
    }

    const destroyTask = async (id) => {
        await axios.delete(`http://localhost:3010/tasks/${id}`);
        fetch();
    };

    useEffect(() => {
        fetch();
    }, []);

    const toggleIsDone = async (id, index) => {
        // 現在のタスクの完了状況を取得して、定数に代入
        // Taskの情報は配列の中からindexをもとに取得
        const isDone = tasks[index].is_done;
        await axios.put(`http://localhost:3010/tasks/${id}`, {
            is_done: !isDone,
        });
        fetch();
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
                    <Flex mb="24px">
                        <Input
                            placeholder="タスク名を入力"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box ml="16px">
                            <Button
                                colorScheme="teal"
                                onClick={createTask}
                            >
                                タスクを作成
                            </Button>
                        </Box>
                    </Flex>
                    <CheckboxGroup>
                        {tasks.map((task, index) => {
                            return (
                                <Task
                                    id={task.id}
                                    key={index}
                                    index={index}
                                    name={task.name}
                                    isDone={task.is_done}
                                    toggleIsDone={toggleIsDone}
                                    destroyTask={destroyTask}
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
