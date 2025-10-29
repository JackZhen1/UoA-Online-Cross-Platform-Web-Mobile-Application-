import React, { useState, ComponentType, useMemo, useCallback, ChangeEvent } from 'react';
import * as MdIcons from 'react-icons/md';
import debounce from 'lodash.debounce';
import { FixedSizeGrid as Grid } from 'react-window';

const ICONS: { key: string; Comp: ComponentType<any> }[] = Object.entries(MdIcons)
    .filter(([key]) => key.startsWith('Md'))
    .map(([key, Comp]) => ({
    key,
    Comp: Comp as ComponentType<any>,
  }));

interface IconPickerProps {
  value?: string;                    
  onChange: (iconKey: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [search, setSearch] = useState('');
  const [rawSearch, setRawSearch] = useState('');
  
  const debounced = useMemo(
    () => debounce((text: string) => setSearch(text), 300),
    []
  );
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRawSearch(e.target.value);
    debounced(e.target.value);
  }, [debounced]);


  const filtered = useMemo(
    () => ICONS.filter(({ key }) => key.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const columnCount = 8;
  const cellSize = 48;
  const rowsToShow  = 6;
  const rowCount = Math.ceil(filtered.length / columnCount);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <input
        type="text"
        placeholder="Search icon (for example: home)"
        value={rawSearch}
        onChange={handleSearchChange}
        style={{ padding: 4, marginBottom: 8, width: 200 }}
      />

      <Grid
      columnCount={columnCount}
      columnWidth={cellSize}
      height={cellSize * rowsToShow}     
      rowCount={rowCount}
      rowHeight={cellSize}
      width={columnCount * cellSize + 16}
    >
      {({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * columnCount + columnIndex;
        if (index >= filtered.length) return null;
        const { key, Comp } = filtered[index];
        const raw = key
          .replace(/^Md/, '')         
          .replace(/(Outlined|Round|Sharp|TwoTone|Filled)$/, '');             
        const name = raw
            .split(/(?=[A-Z])/)                               
            .map(s => s.toLowerCase())                       
            .join('-'); 
        const iconKey = `MaterialIcons#${name}`;

        return (
          <div
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: value === iconKey ? '2px solid #1890ff' : '1px solid #ddd',
            }}
            onClick={() => onChange(iconKey)}
            key={key}
          >
            <Comp size={24} />
          </div>
        );
      }}
    </Grid>
    </div>
  );
};
