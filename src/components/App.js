import React, {useState, useEffect, useRef} from 'react';
import chroma from 'chroma-js';
import Select from 'react-select-v2';
import StackGrid, {transitions} from 'react-stack-grid';
import { useParams } from 'react-router-dom';

import {movies$} from './movies';
import LikeDislikeBar from './LikeDislikeBar';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ClearIcon from './ClearIcon';
import Pagination from './Pagination';
import { clamp } from '../helpers';

import './App.css';

const countPerPageOptions = [
  { value: 4, label: '4'},
  { value: 8, label: '8'},
  { value: 12, label: '12'}
];

const selectColor = '#2dce89';

/* https://react-select.com/home#custom-styles */
const selectStyles = {
  option: (styles, { isFocused, isSelected }) => {
    const color = chroma(selectColor);
    return {
      ...styles,
      backgroundColor: isSelected
        ? color.alpha(0.1).css()
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: null,
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? selectColor : color.alpha(0.3).css(),
      },
    };
  },
  multiValue: (styles) => {
    const color = chroma(selectColor);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    fontWeight: '600',
    color: selectColor,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: selectColor,
    ':hover': {
      backgroundColor: selectColor,
      color: 'white',
    },
  })
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [countPerPage, setCountPerPage] = useState(countPerPageOptions[1]);

  const deleteMovie = movies.find(movie => movie.id === deleteId);
  const categories = [...new Set(movies.map(movie => movie.category))]
    .map(category => ({value: category, label: category}));

  useEffect(() => {
    movies$.then(movies => {
      setMovies(movies);
      setLoading(false);
    });

  }, []);

  const handleClickClearIcon = (id) => {
    setDeleteId(id);
    // eslint-disable-next-line
    $('#confirm-delete-modal').modal('show');
  }

  const handleClickDelete = () => {
    setMovies(movies.filter(movie => movie.id !== deleteId));
    // eslint-disable-next-line
    $('#confirm-delete-modal').modal('hide');
  }

  const handleLike = (id, like) => {
    setMovies(movies.map(movie => (
        movie.id === id
        ? {...movie, liked: like}
        : movie)
      ));
  }

  const categoriesFilter = (movie) => (
    selectedCategories.length !== 0
    ? selectedCategories.map(entry => entry.value).includes(movie.category)
    : true
  );

  const pageFilter = (movie, index, movies) => {
    const loc = movies.map(m => m.id).indexOf(movie.id) + 1;
    return countPerPage.value * (currentPage - 1) < loc
    && loc <= countPerPage.value * currentPage;
  };

  const pageCount = Math.ceil(movies.filter(categoriesFilter).length / countPerPage.value);

  const { page } = useParams();
  const currentPage = clamp(parseInt(page) || 1, pageCount);

  return (
    <>
      <div className='movies-app'>
        <div className='movies-head'>
          <Select
            className='select-categories'
            value={selectedCategories}
            onChange={setSelectedCategories}
            options={categories}
            isMulti={true}
            styles={selectStyles}
            placeholder='Select a category ...'
            />
        </div>
        <div className='movies'>
          {loading
            ? (
              <div className='spinner-box'>
                <div className='spinner-border'/>
              </div>
            )
            : (
            <StackGrid
              columnWidth={300}
              >
            {movies
              .filter(categoriesFilter)
              .filter(pageFilter)
              .map(movie => (
                <div className='movie' key={movie.id}>
                  <ClearIcon
                    onClick={() => handleClickClearIcon(movie.id)}
                  />
                  <h3>{movie.title}</h3>
                  <h5>{movie.category}</h5>
                  <LikeDislikeBar
                    likes={movie.likes}
                    dislikes={movie.dislikes}
                    liked={movie.liked}
                    onLike={(like) => handleLike(movie.id, like)}
                    />
                </div>
            ))}
            </StackGrid>
          )}
          <div className='page-form-control'>
            <strong>Films per page</strong>
            <Select
              className='select-count-per-page'
              styles={selectStyles}
              value={countPerPage}
              onChange={setCountPerPage}
              options={countPerPageOptions}
            />
          </div>
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            />
        </div>
      </div>
      <ConfirmDeleteModal
        movie={deleteMovie}
        onClickDelete={handleClickDelete}
        />
    </>
  );
}

export default App;
