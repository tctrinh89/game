import { useEffect, useState ,useRef} from "react";
import audio60s from './audio/60s.mp3';
import audio1s from './audio/1s.wav';

import './Game.css'

function Game(){
    const daus=['+','-','*','/']
    const buttons=['1','2','3','4','5','6','7','8','9','0','X','Enter']
    
    const [timeInput,setTimeInput]=useState('')
    const [time,setTime]=useState('')
    const [number,setNumber]=useState('')
    const [phepToans,setPhepToans]=useState([])
    const [showGame,setShowGame]=useState(true)
    const audio=useRef()
    const [showCho,setShowCho]=useState(true)
    const [count,setCount]=useState(3)
    const downCount=useRef()
    const [score,setScore]=useState('')
    const [question,setQuestion]=useState('')
    const [answer,setAnswer]=useState('')
    const downTime=useRef()
    const [showKetthuc,setShowKetthuc]=useState(true)

    const handleCheck=(e)=>{
        if(phepToans.includes(e)){
            setPhepToans(phepToans.filter(item=>item !== e))
        } else{
            setPhepToans([...phepToans,e])
        }
    }
    const handleButton=(e)=>{
        if(e.target.value ==='X'){
            setAnswer('')
        } else if(e.target.value ==='Enter'){
            if(eval(question)=== Number(answer)){
                clearInterval(downTime.current)
                setScore(score+1)
                setAnswer('')
                setTime(timeInput)
                setShowCho(!showCho)
            } else {
                setShowKetthuc(!showKetthuc)
                clearInterval(downTime.current)
            }
        } else{
            setAnswer(answer+e.target.value)
        }
    }
    const handleBegin=()=>{
        setTime(+timeInput)
        setShowGame(!showGame)
        setScore(0)
        setShowKetthuc(!showKetthuc)
        setAnswer('')
    }
    const handleReset=()=>{
        setShowGame(!showGame)
        setPhepToans([])
        setTimeInput('')
        setNumber('')
    }

    useEffect(()=>{
        console.log('time')
        if(showCho){
        downTime.current=setInterval(() => {
        if(time>0){
            setTime(pre=>pre-1)
        }
        else {
            setShowKetthuc(!showKetthuc)
        }}
        ,1000)
    }
        return ()=>clearInterval(downTime.current)
    },[showCho,time])
    useEffect(()=>{
        let so1=Math.floor(Math.random()*number)
        let so2=Math.floor(Math.random()*number)
        let auto=Math.floor(Math.random()*10)
        let pheptoan=phepToans[Math.floor(Math.random()*phepToans.length)]
        const so=[so1,so2]
        so.sort((a,b)=>b-a)
        setQuestion(`${so[0] || auto} ${pheptoan ||'+'} ${so[1] ||5}`)
    },[score])
    useEffect(()=>{
        console.log('xem')
        if(!showCho){
            downCount.current=setInterval(() => {
                if(count===1){
                    setCount('start')
                }else if(count>0){
                    setCount(pre=>pre-1)
                    // new Audio(audio1s).play()
                } else {
                        setShowCho(!showCho)
                        setCount(3)
                        setTime(timeInput)
                }
            },1000)
        }
        return ()=>
            clearInterval(downCount.current)
    },[showCho,count])
    return(
        <div className="Game">
            {showGame ? (
            <div className="Begin">
                <div className="Input">
                    <label>Nhập time</label>
                    <input value={timeInput}
                    onChange={e=>setTimeInput(e.target.value)}/>
                </div>
                <div className="Input">
                    <label>Nhập so</label>
                    <input value={number}
                    onChange={e=>setNumber(e.target.value)}/>
                </div>
                <div className="Check">
                    <p>Chọn phép toán :</p>
                    <div style={{margin:'20px 0 10px 15px'}}>
                    {daus.map((dau,index)=>(
                        <div key={index}>
                            <input value={dau}
                                type="checkbox"
                                onChange={()=>handleCheck(dau)}
                                />
                            {dau}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="Button">
                    <button onClick={handleBegin}>Begin</button>
                </div>
            </div> ) :(
                <>
             { showKetthuc ? (
            <div className="Calculator">
                {showCho ? (
                <div className="StartGame">
                <audio ref={audio} src={audio60s} autoPlay loop></audio>
                <div>
                    Score: {score}
                </div>
                <div className="Time">
                    {time}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/>
                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/>
                    </svg>
                </div>
                <h2>Calculator</h2>
                <div className="AnsQues">
                    <input className="Question" value={question} readOnly/>
                    <input className="Answer" value={answer} onChange= {e=>(e.target.value)}
                    // {e=>setAnswer(e.target.value)}
                    />
                </div>
                <div className="ButtonGame">
                    {buttons.map((button,index)=>(
                        <div key={index}>
                            <button value={button} onClick={e=>handleButton(e)}>{button}</button>
                        </div>
                    ))
                    }
                </div>
                </div> ):(
                <div className="Cho">
                    <audio src={audio1s} autoPlay loop></audio>
                    {count}
                </div>
                )}
            </div> ) :
            (<div className="Ketthuc" >
               <p> bạn trả lời đúng : {score}</p> 
               <button onClick={handleReset}>Reset</button>
            </div>)
             }
             </>
            )
            }
        </div>
    )
}
export default Game;