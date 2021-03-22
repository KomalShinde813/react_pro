import { useEffect, useState } from "react";
import { DefaultButton, PrimaryButton, SecondaryButton } from "../FormInput";

const style = { display: "flex", justifyContent: "space-around", margin:10 };

const EvenSpaceButtonGroup = props => {
    const [state, setState] = useState({
        buttons: []
    });

    useEffect(() => {
        const activeBtnIndex = Math.min(Math.max(0,props.buttons.length - 1), props.selectedIndex || 0);
        const buttons = [...(props.buttons || [])];        
        if(activeBtnIndex < buttons.length){
            props.onClick && props.onClick(buttons[activeBtnIndex]);
        }
        setState(st => ({
            ...st,
            selectedIndex: activeBtnIndex,
            buttons
        }));       

    }, [props.selectedIndex, props.buttons]);

    const buttonClicked = (btn, i)=> {
        setState(st=>({...st, selectedIndex:i}));
        props.onClick && props.onClick(btn);
    }

    return <div style={style}>
        {state.buttons.map((btn, i) => {
            if (i === state.selectedIndex) {
                if(props.color==="secondary"){
                    return <SecondaryButton key={i} onClick={() => buttonClicked(btn, i)}>{btn.label}</SecondaryButton>
                }
                return <PrimaryButton key={i} onClick={() => buttonClicked(btn, i)}>{btn.label}</PrimaryButton>
            } else {
                return <DefaultButton key={i} onClick={() => buttonClicked(btn, i)}>{btn.label}</DefaultButton>
            }
        })}
    </div>
}

export default EvenSpaceButtonGroup;