import React from 'react';
import { observer } from 'mobx-react';
import Envelope from 'components/Envelope';

const withEnvelope = (Component: React.FC) =>
  observer(({ ...props }) => (
    <Envelope>
      <Component {...props} />
    </Envelope>
  ));

export default withEnvelope;
