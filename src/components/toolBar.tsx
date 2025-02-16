import React, {useState} from 'react';
import {Line, Polygon, Circle} from 'fabric';
import Button from './Common/Button/Button';
import {IToolbar} from '@/types/toolbar';
import {
  TextField,
  Box,
  Typography,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {authActions} from '@/redux/slice/authSlice';

const Toolbar = ({
  canvas,
  setIsPanning,
  setDrawingMode,
  drawingMode,
  setPolygonPoints,
  setStartPoint,
  strokeWidth,
  handleStrokeWidthChange,
  fontSize,
  handleFontSizeChange,
  textColor,
  handleTextColorChange,
  fontFamily,
  setFontFamily,
  textInput,
  setTextInput,
  handleAddText,
  isPannings,
  handleDownloadDXF,
  scale,
  handleFileUpload,
}: IToolbar) => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [user, setUser] = useState({username: '', password: ''});
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleLogin = () => {
    if (user.username === 'admin' && user.password === 'admin') {
      setIsLoggedIn(true);
      setError('');
      setIsLoginDialogOpen(false);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const toggleLoginDialog = () => {
    setIsLoginDialogOpen((prev) => !prev);
  };

  const handleDeleteSelected = () => {
    if (canvas.current) {
      const activeObjects = canvas.current.getActiveObjects();
      activeObjects.forEach((obj: any) => {
        canvas.current?.remove(obj);
      });
      canvas.current.discardActiveObject();
      canvas.current.renderAll();
    }
  };

  const toggleLineMode = () => {
    setIsPanning(false);
    setDrawingMode((prevMode: any) => (prevMode === 'line' ? 'none' : 'line'));
  };

  const togglePolygonMode = () => {
    setPolygonPoints([]);
    setIsPanning(false);
    setDrawingMode((prevMode: any) =>
      prevMode === 'polygon' ? 'none' : 'polygon'
    );
  };

  const toggleCircleMode = () => {
    setStartPoint(null);
    setIsPanning(false);
    setDrawingMode((prevMode: any) =>
      prevMode === 'circle' ? 'none' : 'circle'
    );
  };

  const togglePanning = () => {
    setIsPanning(!isPannings);
    setDrawingMode((prevMode: any) => (prevMode === 'pan' ? 'none' : 'pan'));
  };

  const handleDashedStyle = () => {
    if (canvas.current) {
      const activeObjects = canvas.current.getActiveObjects();
      activeObjects.forEach((obj: any) => {
        if (
          obj instanceof Line ||
          obj instanceof Polygon ||
          obj instanceof Circle
        ) {
          const isDashed =
            Array.isArray(obj.strokeDashArray) &&
            obj.strokeDashArray.length > 0;
          (obj as Line).set('strokeDashArray', isDashed ? [] : [5, 5]);
          canvas.current?.renderAll();
        }
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 4,
        backgroundColor: '#269449',
        border: 'solid',
        borderColor: '#FFFFFF',
      }}>
      <div style={{marginTop: '20px', marginLeft: '40px'}}>
        <input type="file" accept=".dxf" onChange={handleFileUpload} />
      </div>
      <div style={{marginTop: '20px', marginRight: '40px', gap: 4}}>
        <div
          style={{
            marginTop: '20px',
            marginRight: '40px',
            gap: 4,
            paddingBottom: '10px',
          }}>
          {!isAuthenticated ? (
            <Button onClick={toggleLoginDialog} title="Log In" />
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">Welcome, {user.username}!</Typography>
              <Button onClick={handleLogout} title="Log Out" />
            </Box>
          )}
          <Dialog open={isLoginDialogOpen} onClose={toggleLoginDialog}>
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
              <TextField
                label="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogin} title="Log In" />
              <Button onClick={toggleLoginDialog} title="Cancel" />
            </DialogActions>
          </Dialog>
        </div>
        <div style={{display: 'flex', gap: 4}}>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
          <Button
            onClick={toggleLineMode}
            title={drawingMode === 'line' ? 'Stop Drawing' : 'Draw Line'}
          />
          <Button
            onClick={togglePolygonMode}
            title={drawingMode === 'polygon' ? 'Stop Drawing' : 'Draw Polygon'}
          />
          <Button
            onClick={toggleCircleMode}
            title={drawingMode === 'circle' ? 'Stop Drawing' : 'Draw Circle'}
          />
          <Button
            onClick={togglePanning}
            title={drawingMode === 'pan' ? 'Stop Pan' : 'Pan'}
          />
          <Button onClick={handleDashedStyle} title="Make Dashed" />
        </div>
        <div style={{marginTop: '10px'}}>
          <Button onClick={handleDownloadDXF} title="Download" />
        </div>
        <label htmlFor="stroke-width">Stroke Width: </label>
        <input
          id="stroke-width"
          type="number"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
          min="1"
          max="20"
        />
        <div
          style={{
            display: 'flex',
            gap: '10px',
            paddingTop: '10px',
            paddingBottom: '5px',
          }}>
          <div>
            <label htmlFor="font-size-input">Font Size: </label>
            <input
              id="font-size-input"
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
              min="12"
              max="72"
            />
          </div>
          <div>
            <label htmlFor="text-color-input">Text Color: </label>
            <input
              id="text-color-input"
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
            />
          </div>
          <div>
            <label htmlFor="font-family-select">Font Family: </label>
            <select
              id="font-family-select"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div>
            <div>Add Text: </div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
        </div>
        <div style={{paddingBottom: '5px'}}>
          <Button onClick={handleAddText} title="Add Text" />
        </div>
        <p>Tỷ lệ hiện tại: {scale}</p>
      </div>
    </div>
  );
};

export default Toolbar;
