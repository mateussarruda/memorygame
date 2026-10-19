import { useEffect, useState } from "react";
import Card from "./Card";
import './MemoryCard.css';

export default function MemoryCard() {
    const [scoreboard, setScorebord] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [historic, setHistoric] = useState([]);
    const [images, setImages] = useState([]);

    const names = ["beedrill", "pikachu", "weedle", "pidgeotto", "ivysaur", "venusaur", "charizard", "squirtle",  "metapod"];
    useEffect(() => {
        const controller = new AbortController();
        names.map(name => {
            console.log('once');
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {signal: controller.signal})
            .then(response => response.json())
            .then(data => { return {id: data.id, value: data.sprites.other.dream_world.front_default}})
            .then( item => setImages(prev => ([
                item,
                ...prev
            ])))
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('AbortError: Fetch request aborted');
                }
            })
            
            
        });

        return () => controller.abort();
    },[])
    const handleClick = (e) => {
        const data = e.target.dataset.id;
        console.log(e.target);
        console.log(historic.includes(data));
        if (historic.includes(data)) {
            setScorebord(0);
            setHistoric([]);
        } else {
            if (scoreboard + 1 > bestScore) {
                setBestScore(scoreboard + 1);
            }
            setScorebord((value) => value + 1);
            setHistoric([...historic, data]);
        }
        console.log(scoreboard);
        console.log(bestScore);
        console.log(JSON.stringify(historic));
    }
    const shuffleArray = (item) => {
        let arr = item.slice(0);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }
    const imagesShuffle = shuffleArray(images);
    return (
        <>
            <main>
                <header>
                <p>Click on the image to earn points. Do not click on the same image.</p>
                <div className="score">
                    Score: {scoreboard}
                    <br />
                    Best Score: {bestScore}
                </div>

                </header>
                {console.log(JSON.stringify(images))}
                <div className="board">
                    {imagesShuffle.map((item) => {
                        return <Card image={item.value} dataId={item.id} key={item.id} onClick={handleClick} />
                    })}
                </div>
            </main>
        </>
    )
}