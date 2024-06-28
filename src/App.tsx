import { useState } from 'react';
import { WetherTable } from './components/WatherTable/WetherTable';
import { IRecord } from './shared/interfaces';
import { ControlPanel } from './components/ControlPanel/ControlPanel';

import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/soho-light/theme.css';
import styles from './App.module.scss';


function App() {
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)

  return (
    <>
      <header className={styles.header}>
        <ControlPanel 
          selectedRecordId={selectedRecord !== null 
            ? selectedRecord.id 
            : selectedRecord
          } 
        />
      </header>
      <main className={styles.main}>
        
        <WetherTable selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} />
      </main>
    </>
  )
}

export default App
