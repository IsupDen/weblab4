import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { coordsAction, hitAction } from "../actions";
import { connect } from "react-redux";
import {Label} from "reactstrap";

class HitForm extends React.Component {
    constructor(props) {
        super(props);
        this.onYChange = this.onYChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clickX = this.clickX.bind(this);
        this.clickR = this.clickR.bind(this);
        this.onReset = this.onReset.bind(this);

        this.state = {
            x: 0,
            y: 0,
            r: 2,
        };
    }

    changeCoords(x, y, r) {
        this.props.dispatch(coordsAction.updateCoords(
            {
                x: x,
                y: y,
                r: r,
            }
        ));
    }

    clickX(e) {
        let x = this.state.x;
        if ((e.target.classList.contains('p-inputnumber-button-up') || e.target.classList.contains('pi-angle-up')) && x < 5) {
            x += 0.5;
        }
        else if ((e.target.classList.contains('p-inputnumber-button-down') || e.target.classList.contains('pi-angle-down')) && x > -5) {
            x -= 0.5;
        }
        this.setState({
            ...this.state,
            x: x
        })
        this.changeCoords(x, this.state.y, this.state.r);
    }

    clickR(e) {
        let r = this.state.r;
        if ((e.target.classList.contains('p-inputnumber-button-up') || e.target.classList.contains('pi-angle-up')) && r < 4) {
            r += 0.5;
        }
        else if ((e.target.classList.contains('p-inputnumber-button-down') || e.target.classList.contains('pi-angle-down')) && r > 1) {
            r -= 0.5;
        }
        this.setState({
            ...this.state,
            r: r
        })
        this.changeCoords(this.state.x, this.state.y, r);
    }

    onYChange(e) {
        const y = e.value;
        this.setState(() => ({ y: y }));
        this.changeCoords(this.state.x, y, this.state.r);
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.dispatch(
            hitAction.createHit(
                {
                    x: this.state.x,
                    y: this.state.y,
                    r: this.state.r,
                    timeZone: (new Date()).getTimezoneOffset(),
                }
            )
        );
    }

    onReset(e) {
        this.setState({
            x: 0,
            y: 0,
            r: 2
        });
        this.changeCoords(0, 0, 2);
    }

    render() {
        const { x, y, r } = this.state;
        return (
            <div className={'add-div'}>
                <form onSubmit={this.onSubmit} className='form'>
                    <div className={'x-div'}>
                        <Label for={'x'}>X: </Label>
                        <InputNumber
                            className={'x-input'}
                            name={'x'}
                            placeholder="x"
                            showButtons
                            required={true}
                            readOnly
                            value={x}
                            onClick={(e) => this.clickX(e)}/>
                    </div>
                    <div className={'y-div'}>
                        <Label for={'y'}>Y: </Label>
                        <Slider
                            className={'y-input'}
                            name={'y'}
                            placeholder="y"
                            min={-5}
                            max={5}
                            step={0.1}
                            value={y}
                            onChange={(e) => this.onYChange(e)}/>
                    </div>
                    <div className={'r-div'}>
                        <Label for={'r'}>R: </Label>
                        <InputNumber
                            className={'r-input'}
                            name={'r'}
                            placeholder="r"
                            showButtons
                            required={true}
                            readOnly
                            value={r}
                            onClick={(e) => this.clickR(e)}/>
                    </div>
                    <button type={'submit'} className={'add-button'}><span>Add hit</span><i></i></button>
                    <button type={'reset'} className={'reset-button'} onClick={e => this.onReset(e)}><span>Reset</span><i></i></button>
                </form>
            </div>
        );
    }
}

export default connect()(HitForm);