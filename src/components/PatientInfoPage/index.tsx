import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Patient } from '../../types';

interface Props {
  patient: Patient | undefined;
}

const PatientInfoPage = ({ patient }: Props) => {
  if (!patient) {
    return null;
  }
  return (
    <div>
      <Typography variant="h5" style={{ margin: '1em 0em' }}>
        {patient.name}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <QuestionMarkIcon />
        )}
      </Typography>
      <Typography variant="body1"> ssh: {patient.ssn} </Typography>
      <Typography variant="body1">
        {' '}
        occupation: {patient.occupation}{' '}
      </Typography>
      {patient.entries.length > 0 ? (
        <div>
          <Typography variant="h6" style={{ margin: '1em 0em' }}>
            {' '}
            entries
          </Typography>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <div>
                {' '}
                {/** place these on the same line */}
                <Typography variant="body1" display="inline">
                  {entry.date}{' '}
                </Typography>
                <Typography
                  variant="body1"
                  display="inline"
                  sx={{ fontStyle: 'italic' }}
                >
                  {entry.description}
                </Typography>
              </div>
              {entry.diagnosisCodes ? (
                <div>
                  <ul>
                    {entry.diagnosisCodes.map((diagnCode, index) => (
                      <li key={index}>{diagnCode}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PatientInfoPage;
