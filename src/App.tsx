import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import { getAllDiagnosis } from './services/diagnosis';
import PatientListPage from './components/PatientListPage';
import PatientInfoPage from './components/PatientInfoPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnosisList = async () => {
      const diagnosis = await getAllDiagnosis();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosisList();
  }, []);

  const patientMatch = useMatch('/patients/:id');
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = patientMatch
        ? await patientService.getPatientById(
            patientMatch.params.id ? patientMatch.params.id : ''
          )
        : undefined;
      setPatient(patient);
    };
    void fetchPatient();
  }, [patientMatch]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/patients/:id"
            element={
              <PatientInfoPage patient={patient} diagnosis={diagnosis} />
            }
          />
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
