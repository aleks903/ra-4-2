import React, { useState } from 'react';
import moment from 'moment';
import shortid from 'shortid';
import TrainingAddForm from './TrainingAddForm.js';
import trainingsAddChange from './trainingsAddChange.js';
import TrainingsList from './TrainingsList.js';
import TrainingModel from '../model/TrainingModel.js';

export default function TrainingHistory() {
  const [trainings, setTrainings] = useState([]);
  const [itemTraining, setItemTraining] = useState({
    id: '',
    date: '',
    distance: '',
  });

  const sortTrainings = trainings.sort((a, b) => moment(b.date, 'DD.MM.YY') - moment(a.date, 'DD.MM.YY'));

  const handleFormSubmit = (objValue) => {
    const {
      id,
      date,
      distance,
      kilometr,
    } = objValue;

    if (!id) {
      const training = new TrainingModel(shortid.generate(), date, distance, kilometr);

      setTrainings([...trainingsAddChange(trainings, training)]);
    } else {
      setTrainings((prevTrainings) => prevTrainings.map((itemTrainings) => {
        if (itemTrainings.id === id) {
          setItemTraining({
            id: '',
            date: '',
            distance: '',
          });
          return new TrainingModel(id, date, distance, kilometr);
        }
        return itemTrainings;
      }));
    }
  };

  const handleRemove = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((o) => o.id !== id));
  };

  const handleChange = (objValue) => {
    setItemTraining({
      id: objValue.id,
      date: objValue.date,
      distance: `${objValue.distance}${objValue.kilometr}`,
    });
  };

  return (
    <React.Fragment>
      <TrainingAddForm
        valueForm={itemTraining}
        // onFormChangre={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <TrainingsList data={sortTrainings} onRemove={handleRemove} onChange={handleChange} />
    </React.Fragment>
  );
}
