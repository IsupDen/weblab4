import React from 'react';
import { connect } from 'react-redux';

const Hit = ({ x, y, r, curTime, executionTime, result }) => (
    <tr>
        <td>
            ({x}, {y})
        </td>
        <td>
            {r}
        </td>
        <td>
            {curTime}
        </td>
        <td>
            {(executionTime / 1000000).toFixed(3)}
        </td>
        <td>
            {result ? "Попал" : "Мимо"}
        </td>
    </tr>
);

export default connect()(Hit);