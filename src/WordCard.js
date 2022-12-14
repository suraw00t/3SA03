import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import _ from 'lodash';


const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    let shuffled = chars.join("")
    return {
        word,
        shuffled,
        chars,
        attempt: 1,
        guess: '',
        completed: false
    }
}

export default function WordCard(props){
    const [state, setState] = useState(prepareStateFromWord(props.value))
    const [state2, setState2] = useState(prepareStateFromWord(state.shuffled))

    const refreshWindows = () => { window.location.reload() }
    const refreshBtn = () => {
        return (
            <div className="alert alert-success">
                <h4 className="alert-heading">Well done!</h4>
                <hr/>
                <button className="btn btn-success" onClick={refreshWindows}>New Game</button>
            </div>
        )
    }

    const activationHandler = (c) => {
        console.log(`${c} has been activated.`)

        let guess = state.guess + c
        setState({...state, guess})

        if(guess.length === state.shuffled.length){
            if(guess === state2.shuffled){
                console.log('yeah!')
                setState({...state, guess: '', completed: true})
            }else{
                console.log('reset')
                setState({...state, guess: '', attempt: state.attempt + 1, chars: _.shuffle(state.chars)})
                setState2({...state2, shuffled: _.shuffle(state.chars).join("")})
                console.log(`Answer = ${state2.shuffled}`)
            }
        }
    }

    return (
    <div className="bdy dark-background" style={{ backgroundImage: `url(https://i.ibb.co/nrmkm7d/five-bells-washed-out-logo.png)`, height:"100vh" }}>
        <div className="outer-border">
            <div className="mid-border">
                <div className="inner-border">
                    <div className="container text-center">
                        { state.chars.map((c, i) => <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt={state.attempt}/>) }
                        <div className="alert alert-info">
                            { state.completed ? refreshBtn() : '' }
                            <h2>Attempt = {state.attempt - 1}</h2>
                        </div>
                    </div>
                </div>
            </div>
      </div>
</div>

    );
}
