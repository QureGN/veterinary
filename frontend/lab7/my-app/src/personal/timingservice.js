import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function TimingService(props) {
    const {items} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [timing, setTime] = useState([]);
    const [service1, setService] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/stocks3/${items.time1}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTime(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        fetch(`http://127.0.0.1:8000/stocks1/${items.service1}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setService(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])



    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>

                <ul >

                    <div>


                        <h1>{service1.service}</h1>
                        <h2>{timing.time2}</h2>
                    </div>

                </ul>
            </div>

        );
    }
}
export default TimingService;