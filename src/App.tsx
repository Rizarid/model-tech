import { useState } from 'react';
import { WetherTable } from './components/WatherTable/WetherTable';
import { IRecord } from './shared/interfaces';

import './App.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)

  return (
    <main>
      <WetherTable selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} />
    </main>
  )
}

export default App
