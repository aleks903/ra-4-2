import React from 'react';
import PropTypes from 'prop-types';
import TrainingModel from '../model/TrainingModel.js';

export default function TrainingsList(props) {
  const { data } = props;

  const onRemove = (id) => {
    props.onRemove(id);
  };

  const onChange = (objValue) => {
    props.onChange(objValue);
  };

  return (
    <React.Fragment>
            <table>
        <thead>
          <tr>
            <td>Дата (ДД.ММ.ГГ)</td>
            <td>Пройдено км</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{o.date}</td>
              <td>{o.distance}{o.kilometr}</td>
              <td>
                <span className="change" onClick={() => onChange({
                  id: o.id,
                  date: o.date,
                  distance: o.distance,
                  kilometr: o.kilometr,
                })}> </span>
                <span className="remove" onClick={() => onRemove(o.id)}> </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

TrainingsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(TrainingModel)).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
