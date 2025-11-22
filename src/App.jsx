import { useState, useEffect } from 'react'
import './App.css'
import diceData from './eachDice.js'
import EachDice from './eachDice.jsx';

export default function App() {

  const [diceInfo, setDiceInfo] = useState(diceData);
  const [gameLoop, setGameLoop] = useState(1); //game runs if true
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  function setNewGame(){
    setDiceInfo(diceData);
    setTime(0);
    setIsTimerRunning(false);
    setGameLoop(1);
  }

  useEffect(()=>{checkTerminatingCondition();},[diceInfo]);

  useEffect(()=>{
    let intervalID;
    if(isTimerRunning){
      intervalID = setInterval(()=>{
        setTime(prevTime=>prevTime+1)
      }, 1000);
    }
    return()=>clearInterval(intervalID);
  } ,[isTimerRunning])

  function DiceRoll(){
    if(!isTimerRunning) setIsTimerRunning(true);
    setDiceInfo(data => data.map(indivisualDice=>
      (indivisualDice.fixed==false)?{...indivisualDice, number: Math.floor(Math.random()*7)}
      :
      {...indivisualDice}
    ));
  }

  function checkTerminatingCondition(){
    let testValue=diceInfo[0].number;
    const checkAll = diceInfo.every(data => data.number == testValue)
    if (checkAll && diceInfo[0].number!=null){
      setIsTimerRunning(false);
      setGameLoop(0);
    }
  } 

  function manageFixedProperty(idReturnFromChild){
    console.log(idReturnFromChild);
      setDiceInfo(data=> data.map(indivisualDice=>{
        if(idReturnFromChild==indivisualDice.id) return {...indivisualDice, fixed: !indivisualDice.fixed}
        else return{...indivisualDice}
      }));
  }

  return(
    <>
        <div className="flex flex-col justify-center items-center min-h-[100vh] p-5">
          <header className="font-bold text-5xl mb-3 text-[#FF5555]">TENZIS</header>
              <div className='p-3 text-[9px] sm:text-[16px]  lg:text-[20px]'>
                  <p>Start the game and roll the dice. Try to make all of the dice the same number.</p>
                  <p>selecting a dice will stop the reroll process and it can be unselected</p>
                </div>
              
              <div className="bg-[#FF5555] w-full max-w-[500px] h-auto grid grid-cols-4 gap-3 p-2 m-4 rounded-2xl">

                {
                gameLoop==0 ?
                <><h1 className='m-4 text-white mx-auto'>YOU WON</h1>
                  <p className='m-4 text-white mx-auto'>TIME: {time} SEC</p>
                </>
                :
                diceInfo.map((eachData) => <EachDice function={manageFixedProperty} fixed={eachData.fixed} id={eachData.id} key={eachData.id} diceValue={(eachData.number==null)?null:eachData.number}/>)
                }

               </div>

              {gameLoop==0 ?
              <button className='border-2 mt-6 p-3 px-7 rounded-2xl' onClick={setNewGame}> New Game </button>
              :
              <button className='border-2 mt-6 p-3 px-7 rounded-2xl bg-[#FF5555] text-white cursor-pointer' onClick={DiceRoll}>{diceInfo[0].number==null?'Start Game':'shuffle Dice'}</button>
          }      
        </div>
    </>

  )
}


