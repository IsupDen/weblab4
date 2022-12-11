import React from 'react';
import {connect} from "react-redux";
import {hitAction} from "../actions";

const Graph = (props) => {
    const onClick = (e) => {
        props.dispatch(hitAction.createHit({
            x: ((e.nativeEvent.offsetX - 150) / 30).toFixed(2),
            y: ((150 - e.nativeEvent.offsetY) / 30).toFixed(2),
            r: props.coords.r,
            timeZone: (new Date()).getTimezoneOffset(),
        }))
    }

    let { x, y, r } = props.coords;
    x *= 30;
    y *= 30;
    r *= 30;
    const circle = "M 150 150 L 150 " + (150 + r / 2).toString() + " A " + (r / 2).toString() + " " + (r / 2).toString() + " 1 0 0 " + (150 + r / 2).toString() + ",150 z";
    const triangle = "M 150 150 L " + (150 - r / 2).toString() + " 150 L 150 " + (150 - r).toString() + " z";
    return (
        <div className={'graph-div'}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="300"
                 height="300"
                 onClick={(e) => onClick(e)}
                 style={{cursor: "pointer"}}>
                <rect x={150 - r} y="150" width={r} height={r} fill="#6eff3e"/>
                <path d={circle} fill="#6eff3e"/>
                <path d={triangle} fill="#6eff3e"/>
                <line x1="150" x2="150" y1="300" y2="0" stroke="#fff" strokeWidth="3"/>
                <line x1="0" x2="300" y1="150" y2="150" stroke="#fff" strokeWidth="3"/>
                <line x1="150" x2="145" y1="0" y2="10" stroke="#fff" strokeWidth="3"/>
                <line x1="150" x2="155" y1="0" y2="10" stroke="#fff" strokeWidth="3"/>
                <line x1="300" x2="290" y1="150" y2="145" stroke="#fff" strokeWidth="3"/>
                <line x1="300" x2="290" y1="150" y2="155" stroke="#fff" strokeWidth="3"/>
                <line x1={150 - r / 2} x2={150 - r / 2} y1="145" y2="155" stroke="#fff" strokeWidth="3"/>
                <line x1={150 - r} x2={150 - r} y1="145" y2="155" stroke="#fff" strokeWidth="3"/>
                <line x1={150 + r / 2} x2={150 + r / 2} y1="145" y2="155" stroke="#fff" strokeWidth="3"/>
                <line x1={150 + r} x2={150 + r} y1="145" y2="155" stroke="#fff" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 - r} y2={150 - r} stroke="#fff" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 - r / 2} y2={150 - r / 2} stroke="#fff" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 + r / 2} y2={150 + r / 2} stroke="#fff" strokeWidth="3"/>
                <line x1="145" x2="155" y1={150 + r} y2={150 + r} stroke="#fff" strokeWidth="3"/>
                <text x={145 - r} y="140" fill="#fff" fontWeight="bold">R</text>
                <text x={145 + r} y="140" fill="#fff" fontWeight="bold">R</text>
                <text x="160" y={155 - r} fill="#fff" fontWeight="bold">R</text>
                <text x="160" y={155 + r} fill="#fff" fontWeight="bold">R</text>
                {
                    props.hits.map(hit => {
                        return (
                            <circle key={hit.id}
                                    cx={150 + hit.x * 30}
                                    cy={150 - hit.y * 30}
                                    r={5}
                                    fill={hit.result ? '#1d5e91' :'#78183a'}
                            />
                        );
                    })
                }
                <circle id="point" cx={150 + x} cy={150 - y} r="5" fill="#ff1867"/>
            </svg>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { coords, hits } = state;
    return {
        coords,
        hits
    };
}

export default connect(mapStateToProps)(Graph);