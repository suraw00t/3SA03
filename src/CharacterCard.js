import React, { useState, useRef, useEffect } from 'react';
export default function CharacterCard(props) {
    const [active, setActive] = useState(false);
    const attemptRef = useRef(props.attempt);
    const activate = () => {
        if(!active){
            setActive(true)
            props.activationHandler(props.value)
        }
    }
    const className = `card ${active ? 'activeCard': ''}`

    useEffect(() => {
        if(attemptRef.current !== props.attempt){
            setActive(false)
            attemptRef.current = props.attempt
        }
    }, [props.attempt])

    return (
        <div className={className} onClick={activate}>{props.value}</div>
    )
}
