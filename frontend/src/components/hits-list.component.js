import React from "react";
import { connect } from 'react-redux';
import Hit from './hit.component';

const HitList = (props) => (
    <div>
        <table className={'results'}>
            <thead>
            <tr>
                <td className={'coords-col'}>Coords</td>
                <td className={'radius-col'}>Radius</td>
                <td className={'cur-time-col'}>Current time</td>
                <td className={'ex-time-col'}>Execution time (ms)</td>
                <td className={'result-col'}>Result</td>
            </tr>
            </thead>
            <tbody>
            {
                props.hits.map(hit => {
                    return (
                        <Hit {...hit} key={hit.id}/>
                    );
                })
            }
            </tbody>
        </table>
    </div>
);

const mapStateToProps = (state) => {
    const { hits } = state;
    return {
        hits
    };
}

export default connect(mapStateToProps)(HitList);