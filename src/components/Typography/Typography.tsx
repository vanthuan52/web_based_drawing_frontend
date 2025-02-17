import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from '@mui/material';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  VerticalAlignTop,
  VerticalAlignCenter,
  VerticalAlignBottom,
} from '@mui/icons-material';
import {Canvas} from 'fabric';
import styles from './Typography.module.scss';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  UnfoldVertical,
} from 'lucide-react';

interface TypographyProps {
  canvas: Canvas | null;
}

const Typography = ({canvas}: TypographyProps) => {
  const [font, setFont] = useState('Inter');
  const [fontWeight, setFontWeight] = useState('Semi bold');
  const [fontSize, setFontSize] = useState(18);
  const [alignment, setAlignment] = useState('left');
  const [verticalAlign, setVerticalAlign] = useState('middle');

  return (
    <div className={styles['typography']}>
      <div className={styles['typography-header']}>
        <span className={styles['typography-title']}>Typograhy</span>
      </div>
      <div className={styles['typography-body']}>
        {/* Font Family */}
        <FormControl fullWidth sx={{mt: 1}}>
          <Select value={font} onChange={(e) => setFont(e.target.value)}>
            <MenuItem value="Inter">Inter</MenuItem>
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          </Select>
        </FormControl>

        {/* Font weight & Font size */}
        <div className={styles['typography-font']}>
          <FormControl className={styles['typography-font__weight']}>
            <Select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Semi Bold">Semi Bold</MenuItem>
              <MenuItem value="Bold">Bold</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={styles['typography-font__size']}
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            size="small"
          />
        </div>

        {/* Line Height & Letter Spacing */}
        <div className={styles['typography-spacing']}>
          <TextField
            className={styles['typography-spacing__lineheight']}
            label="A"
            value="Auto"
            size="small"
            sx={{flex: 1}}
          />
          <TextField
            className={styles['typography-spacing__letterspacing']}
            label="| A"
            value="0%"
            size="small"
            sx={{flex: 1}}
          />
        </div>

        {/* Text Alignment */}
        <div className={styles['typography-alignment']}>
          <div className={styles['typography-alignment__text']}>
            <div className={styles['typography-alignment__position']}>
              <AlignLeft />
            </div>
            <div className={styles['typography-alignment__position']}>
              <AlignCenter />
            </div>
            <div className={styles['typography-alignment__position']}>
              <AlignRight />
            </div>
          </div>

          {/* Vertical Alignment */}
          <div className={styles['typography-alignment__vertical']}>
            <div className={styles['typography-alignment__position']}>
              <ArrowUpFromLine />
            </div>
            <div className={styles['typography-alignment__position']}>
              <UnfoldVertical />
            </div>
            <div className={styles['typography-alignment__position']}>
              <ArrowDownToLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typography;
