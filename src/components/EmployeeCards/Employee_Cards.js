import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getAllEmployees, setSortBy, setCurrentPage, getPartEmployess, getPartFindAndSortEmployess, getPartFindEmployee, getPartSortedEmployees } from '../../actions/employeeAction';
import './Employee_Cards.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  InputBase,
  Divider
} from '@mui/material';
import noPhoto from '../../images/no_photo.jpg';
import Numeration from '../Numeration/Numeration';
import hostServerJSON from "../../hostServer.json";
const hostServer = hostServerJSON.localhost_path;
const MANAGERROLE = "РУКОВОДИТЕЛЬ";
const INSPECTORROLE = "ИНСПЕКТОР";

const Employee_Cards = () => {
  const dispatch = useDispatch();
  const { employees, part_employees, currentPage, totalPages, limit, loading, error } = useSelector(state => state.employee);
  const [open, setOpen] = useState(false);
  const [choosenEmployee, setchoosenEmployee] = useState(null);
  const [choice, setChoice] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const currentRole = localStorage.getItem('roleNames');


  const fetchEmployees = (page, limit) => {
    if (searchQuery.trim() !== '' && sortBy !== '') {
      dispatch(getPartFindAndSortEmployess(page, limit, searchQuery, sortBy));
    } else if (searchQuery.trim() !== '') {
      dispatch(getPartFindEmployee(page, limit, searchQuery));
    } else if (sortBy !== '') {
      dispatch(getPartSortedEmployees(page, limit, sortBy));
    } else {
      dispatch(getPartEmployess(page, limit));
    }
  };

  const handleSearchChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(inputSearch);
    fetchEmployees(currentPage, limit)
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setInputSearch('');
    fetchEmployees(currentPage, limit);
  };

  //Сортировка по данным в Redux
  // const handleSortByChange = (event) => {
  //   dispatch(setSortBy(event.target.value));
  // };

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    const validSortOptions = ["fullname", "start_date", "birth_date"];
    const sortByValue = validSortOptions.includes(newSortBy) ? newSortBy : '';
    setSortBy(sortByValue);
    fetchEmployees(currentPage, limit);
  };

  useEffect(() => {
    dispatch(getPartEmployess(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    fetchEmployees(currentPage, limit);
  }, [searchQuery, sortBy, dispatch, currentPage, limit]);

  const handlePageChange = (page) => {
    fetchEmployees(page, limit);
  };


  const navigate = useNavigate()

  const goToAddEmployee = () => {
    navigate("/addEmployee");
  }

  const goToAddVacation = (item) => {
    navigate(`/addInf/vacation/${item.id}`, {state: item});
  }

  const goToAddSickLeave = (item) => {
    navigate(`/addInf/sickLeave/${item.id}`, {state: item});
  }

  const goToAddDayOff = (item) => {
    navigate(`/addInf/dayOff/${item.id}`, {state: item});
  }

  const handleEdit = (item) => {
    navigate(`/editEmployee/${item.id}`, { state: item });
  };

  const handleModalOpen = (item, type) => {
    setOpen(true);
    setChoice(type);
    setchoosenEmployee(item);
  };

  const handleModalClose = () => {
    setOpen(false);
    setChoice(null);
    setchoosenEmployee(null);
  };

  const handleModalConfirm = () => {
    if (choosenEmployee) {
      handleModalClose();
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: "50px auto" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск"
          inputProps={{ 'aria-label': 'Search name, position, email or address' }}
          value={inputSearch}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary.contrastText" sx={{ p: '10px' }} aria-label="clear" onClick={handleClearSearch}>
          <CloseIcon />
        </IconButton>
      </Paper>
      <div className="wrapper">
        <div className="filter_product_category">
          <FormControl>
            <FormLabel>Сортировка</FormLabel>
            <RadioGroup
              value={sortBy || ''}
              name="sort"
              onChange={handleSortByChange}
            >
              <FormControlLabel value="fullname" control={<Radio />} label="По имени" />
              <FormControlLabel value="start_date" control={<Radio />} label="По дате приема на работу" />
              <FormControlLabel value="birth_date" control={<Radio />} label="По возрасту" />
              <FormControlLabel value="" control={<Radio />} label="Отменить" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='field_with_card_and_numeration'>
          <div className="cards">
            {part_employees.map(item => (
              <Card key={item.id} sx={{ width: 345, textAlign: "center" }}>
                <CardHeader
                  title={item.fullname}
                />
                <Link to={`/detailedInfo/${item.id}`} style={{ display: 'block' }}> {/* Добавлено overflow: hidden */}
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.imageUrl ? `${hostServer}${item.imageUrl}` : noPhoto}
                    alt="employee"
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease', /* Добавлено для плавной анимации */
                      }
                    }
                    }
                  />
                </Link>
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                    {item.position}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  {currentRole === MANAGERROLE && (
                    <>
                      <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => handleEdit(item)}>
                        Редактировать
                      </Button>
                      {/* <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => handleDeleteOpen(item)}>
                        Удалить
                      </Button> */}
                    </>
                  )}
                  {currentRole === INSPECTORROLE && (
                    <>
                      <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => goToAddVacation(item)}>
                        Отпуск
                      </Button>
                      <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => goToAddSickLeave(item)}>
                        Больничный
                      </Button>
                      <Button size="small" color='primary.contrastText' sx={{ fontSize: '14px' }} onClick={() => goToAddDayOff(item)}>
                        Прогул
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            ))}
          </div>
          <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          {currentRole === MANAGERROLE && (
            <Button onClick={goToAddEmployee} color='primary.contrastText' sx={{ marginBottom: "50px" }}>
              Добавить работника
            </Button>
          )}
          {/* <Dialog open={open} onClose={handleDeleteClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Вы уверены, что хотите удалить покупателя? Это действие необратимо, и приведет к удалению контрактов, связанных с покупателем и продаж, которые были связаны с контрактами
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color='primary.contrastText'>Отмена</Button>
              <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
            </DialogActions>
          </Dialog> */}
          {/* <Dialog open={open} onClose={handleModalClose}>
            <DialogTitle>Выберите дейтсвие</DialogTitle>
            <DialogActions>
              <Button onClick={goToAdd} color='primary.contrastText'>Добавить</Button>
              <Button onClick={handleDeleteConfirm} color="error">Редактировать</Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </div>
    </>
  );
};

export default Employee_Cards;